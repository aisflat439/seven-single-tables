import React from "react";
import { Dialog } from "@headlessui/react";

import { Table } from "../components/Table";
import { useTypedQuery } from "../urql";

export const Posts = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRedditorOpen, setIsRedditorOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState("");
  const [selectedRedditor, setSelectedRedditor] = React.useState("");

  const [redditorQuery] = useTypedQuery({
    query: {
      redditors: { id: true, name: true },
      posts: {
        id: true,
        post: true,
        comments: { comment: true },
      },
    },
  });

  const handleViewRedditor = (id: string) => {
    setSelectedRedditor(id);
    setIsRedditorOpen(true);
  };

  const handleViewPost = (id: string) => {
    setSelectedPost(id);
    setIsOpen(true);
  };

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
            [
              "getComments",
              "",
              "",
              "$allPosts + post + postId",
              "$postComments",
              "",
              "",
            ],
            [
              "getPostersComments",
              "$reddit + redditorId",
              "$comment + commentId",
              "",
              "",
              "",
              "",
            ],
          ]}
        />
      </div>
      <div>
        <div className="my-4">
          <h4>All Posts:</h4>
          <div className="grid grid-cols-2 gap-4">
            {ready ? (
              posts.map((post) => {
                return (
                  <div
                    className="border p-4 border-l-4 border-l-slate-200 rounded"
                    key={post.id}
                  >
                    <div className="flex justify-between">
                      <h3>{post.post}</h3>
                      <span className="flex items-center">
                        <span className="mr-1 text-sm text-gray-400">
                          replies:
                        </span>
                        {post.comments.length || 0}
                      </span>
                    </div>
                    <button
                      className="text-blue-400"
                      onClick={() => handleViewPost(post.id)}
                    >
                      view comments of this post
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="my-8 text-indigo-200">
                Loading... usually I'd put a spinner here
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="my-4">
          <h4>All Redditors:</h4>
          <div className="grid grid-cols-2 gap-4">
            {ready ? (
              redditors.map((r) => {
                return (
                  <div
                    className="border p-4 border-l-4 border-l-slate-200 rounded"
                    key={r.id}
                  >
                    <h3>{r.name}</h3>
                    <button
                      className="text-blue-400"
                      onClick={() => handleViewRedditor(r.id)}
                    >
                      view all comments by this redditor
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="my-8 text-indigo-200">
                Loading... usually I'd put a spinner here
              </div>
            )}
          </div>
        </div>
      </div>
      <ViewPost id={selectedPost} isOpen={isOpen} setIsOpen={setIsOpen} />
      <ViewRedditor
        id={selectedRedditor}
        isOpen={isRedditorOpen}
        setIsOpen={setIsRedditorOpen}
      />
    </>
  );
};

type ModalProps = {
  children?: React.ReactNode;
  content?: string;
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
};

const ViewPost = (props: Omit<ModalProps, "title" | "content">) => {
  const [postQuery] = useTypedQuery({
    query: {
      getPost: [
        { postId: props.id },
        {
          id: true,
          post: true,
          comments: {
            comment: true,
            commentId: true,
          },
        },
      ],
    },
  });

  const comments = postQuery.data?.getPost[0]?.comments || [];
  const ready = !postQuery.fetching;

  const content = (
    <div>
      {comments.length > 0 ? (
        comments.map((c) => (
          <div key={c.commentId} className="py-4 px-8 border rounded">
            <p>{c.comment}</p>
          </div>
        ))
      ) : (
        <p>This post has no comments.</p>
      )}
    </div>
  );

  return (
    <Modal {...props} title="Post with comments">
      {ready ? content : "Loading..."}
    </Modal>
  );
};

const ViewRedditor = (props: Omit<ModalProps, "title" | "content">) => {
  const [data] = useTypedQuery({
    query: {
      getPostersComments: [
        { redditorId: props.id },
        { comment: true, id: true },
      ],
    },
  });

  const comments = data.data?.getPostersComments || [];
  const ready = !data.fetching;

  const content = (
    <div>
      {comments.length > 0 ? (
        comments.map((c) => (
          <div key={c.id} className="py-4 px-8 border rounded">
            <p>{c.comment}</p>
          </div>
        ))
      ) : (
        <p>This poster has no comments.</p>
      )}
    </div>
  );

  return (
    <Modal {...props} title="Redditor post history">
      {ready ? content : "Loading..."}
    </Modal>
  );
};

const Modal = ({
  children,
  content,
  isOpen,
  setIsOpen,
  title,
}: Omit<ModalProps, "id">) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
          <Dialog.Title className="text-xl">{title}</Dialog.Title>
          <Dialog.Description className="my-4">{content}</Dialog.Description>
          {children}

          <div className="flex justify-end text-blue-400">
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
