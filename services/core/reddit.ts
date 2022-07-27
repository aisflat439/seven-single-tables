export * as Reddit from "./reddit";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem, Service } from "electrodb";
import { ulid } from "ulid";

export const RedditorEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Redditor",
      service: "reddit",
    },
    attributes: {
      redditorId: {
        type: "string",
        required: true,
        readOnly: true,
      },
      name: {
        type: "string",
        required: true,
        readOnly: true, 
      }
    },
    indexes: {
      posters: {
        collection: "reddit",
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["redditorId"],
        }
      },
    }
  }, 
  Dynamo.Configuration
);

export const PostEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Post",
      service: "reddit",
    },
    attributes: {
      postId: {
        type: "string",
        required: true,
        readOnly: true,
      },
      post: {
        type: "string",
        required: true,
      },
      redditorId: {
        type: "string",
        required: true,
      }
    },
    indexes: {
      posts: {
        collection: "posts",
        pk: {
          field: "pk",
          composite: ["redditorId"]
        },
        sk: {
          field: "sk",
          composite: ["postId"]
        }
      },
      allPosts: {
        collection: "allPosts",
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: []
        },
        sk: {
          field: "gsi2sk",
          composite: ["postId"]
        }
      },
      postComments: {
        collection: "postComments",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["postId"]
        },
        sk: {
          field: "gsi1sk",
          composite: []
        }
      }
    }
  }, 
  Dynamo.Configuration
);

export const CommentEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Comment",
      service: "reddit",
    },
    attributes: {
      postId: {
        type: "string",
        required: true,
        readOnly: true,
      },
      commentId: {
        type: "string",
        required: true,
        readOnly: true,
      },
      comment: {
        type: "string",
        required: true,
      },
      redditorId: {
        type: "string",
        required: true,
        readOnly: true,
      }
    },
    indexes: {
      comments: {
        pk: {
          field: "pk",
          composite: ["redditorId"]
        },
        sk: {
          field: "sk",
          composite: ["commentId"]
        }
      },
      postComments: {
        collection: "postComments",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["postId"]
        },
        sk: {
          field: "gsi1sk",
          composite: ["commentId"]
        }
      }
    }
  },
  Dynamo.Configuration
);

export type PostEntityType = EntityItem<typeof PostEntity>;
export type RedditorEntityType = EntityItem<typeof RedditorEntity>;
export type CommentEntityType = EntityItem<typeof CommentEntity>;

export async function create(redditorId: string, post: string) {
  return PostEntity.create({
    redditorId,
    post,
    postId: ulid(),
  }).go()
}

export async function createRedditor(name: string) {
  return RedditorEntity.create({
    name,
    redditorId: ulid(),
  }).go()
}

export async function comment(comment: string, postId: string, redditorId: string) {
  return CommentEntity.create({
    comment,
    commentId: ulid(),
    postId,
    redditorId
  }).go()
}

export async function listRedditors() {
  return RedditorEntity.query.posters({}).go()
}

export async function listPosts() {
  return PostEntity.query.allPosts({}).go()
}

export async function getPosts(redditorId: string) {
  // want to see the params that get generated? You can always log them out here.
  // const params = PostEntity.query.posts({ redditorId }).params();
  // console.log('params: ', params);
  
  return PostEntity.query.posts({
    redditorId
  }).go()
}

export async function getSinglePost(postId: string) {
  return PostEntity.query.postComments({
    postId
  }).go()
}

export async function getComments(postId: string) {
  return CommentEntity.query.postComments({
    postId
  }).go()
}

const PostService = new Service({ RedditorEntity, PostEntity, CommentEntity });

export async function getPostFromService(postId: string) {
  // want to see the params that get generated? You can always log them out here.
  // const params = PostService.collections.postComments({ postId }).params()
  // console.log('params: ', params);
  const data = await PostService.collections.postComments({ postId }).go()  

  return { post: data.PostEntity, comments: data.CommentEntity }
}
