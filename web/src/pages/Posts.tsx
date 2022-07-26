import { Redditor } from "@seven-single-tables/graphql/genql";
import React, { ChangeEvent } from "react";
import { Table } from "../components/Table";
import { useTypedQuery } from "../urql";

export const Posts = () => {
  const [redditorQuery] = useTypedQuery({
    query: {
      redditors: { redditorId: true, name: true },
      posts: {
        postId: true,
        post: true,
        comments: { comment: true },
      },
    },
  });

  const redditors = redditorQuery.data?.redditors || [];
  const posts = redditorQuery.data?.posts || [];
  const ready = !redditorQuery.fetching;

  return (
    <>
      <h2 className="text-2xl m-4">Posts</h2>
      <div className="p-2 shadow">
        <div className="max-w-prose my-4">
          <p className="">Not quite hacker news or reddit.</p>
        </div>
        <p className="mt-2">
          This example implements the following access patterns:
        </p>
        <ul className="pl-4 my-4">
          <li>List Redditors</li>
          <li>List posts</li>
          <li>List posts by poster</li>
          <li>List comments by poster</li>
        </ul>
        <Table
          headers={["PK", "SK", "gsi1pk", "gsi1sk", "gsi2pk", "gsi2sk"]}
          rows={[
            ["redditors", "$reddit", "$reddit + entity + redditorId"],
            ["posts", "", "", "", "", "$reddit", "$allPosts + post + postId"],
          ]}
        />
      </div>
      <div className="my-4">
        <h4>All Posts:</h4>
        <div className="grid grid-cols-2 gap-4">
          {posts.map((post) => {
            return (
              <div className="border p-4" key={post.postId}>
                <h3>{post.post}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-4">
        <h4>All Redditors:</h4>
        <div className="grid grid-cols-2 gap-4">
          {redditors.map((r) => {
            return (
              <div className="border p-4" key={r.redditorId}>
                <h3>{r.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

interface ActivePostsProps {
  ready: boolean;
  redditors: Redditor[];
}

const ActivePosts = ({ redditors, ready }: ActivePostsProps) => {
  const [redditorId, setRedditorId] = React.useState<string>("");

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setRedditorId(event.target.value);
  };
  const [posts] = useTypedQuery({
    query: {
      getPosts: [
        { redditorId },
        {
          postId: true,
          post: true,
        },
      ],
    },
  });
  const postsData = posts.data?.getPosts || [];
  return (
    <div className="my-4">
      {ready ? (
        <>
          <label>Select a user to see their post history</label>
          <select onChange={handleSelect}>
            {redditors.map((r) => (
              <option key={r.redditorId} value={r.redditorId}>
                {r.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>Loading...</>
      )}
      <ul>
        {postsData.map((p) => (
          <Post post={p.post} key={p.postId} postId={p.postId} />
        ))}
      </ul>
    </div>
  );
};

interface PostProps {
  postId: string;
  post: string;
}

const Post = ({ postId, post }: PostProps) => {
  // const [comments] = useTypedQuery({
  //   query: {
  //     getComments: [
  //       { postId },
  //       {

  const handleSelectPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("event: ", event);
  };
  return (
    <li key={postId}>
      {post}
      <button onClick={handleSelectPost}>View Post</button>
    </li>
  );
};
