export * as Reddit from "./reddit";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
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
      posts: {
        collection: "posts",
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
      postsWithComments: {
        collection: "comments",
        index: "comments",
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
      posts: {
        collection: "posts",
        pk: {
          field: "pk",
          composite: ["redditorId"]
        },
        sk: {
          field: "sk",
          composite: ["commentId"]
        }
      },
      comments: {
        collection: "comments",
        index: 'gsi1pk',
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
  return RedditorEntity.query.posts({}).go()
}

export async function getPosts(redditorId: string) {
  return PostEntity.query.posts({
    redditorId
  }).go()
}

export async function getPost(postId: string) {
  return PostEntity.query.postsWithComments({
    postId
  }).go()
}

export async function getComments(postId: string) {
  return CommentEntity.query.comments({
    postId
  }).go()
}