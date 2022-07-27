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
      redditors: { redditorId: true, name: true },
      posts: {
        postId: true,
        post: true,
        comments: { comment: true },
      },
    },
  });

  const handleViewRedditor = () => {
    setIsRedditorOpen(true);
  };

  const handleViewPost = () => {
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
          ]}
        />
      </div>
      <div>
        <div className="my-4">
          <h4>All Posts:</h4>
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post) => {
              return (
                <div
                  className="border p-4 border-l-4 border-l-slate-200 rounded"
                  key={post.postId}
                >
                  <h3>{post.post}</h3>
                  <button className="text-blue-400" onClick={handleViewPost}>
                    view
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <div className="my-4">
          <h4>All Redditors:</h4>
          <div className="grid grid-cols-2 gap-4">
            {redditors.map((r) => {
              return (
                <div
                  className="border p-4 border-l-4 border-l-slate-200 rounded"
                  key={r.redditorId}
                >
                  <h3>{r.name}</h3>
                  <button
                    className="text-blue-400"
                    onClick={handleViewRedditor}
                  >
                    view
                  </button>
                </div>
              );
            })}
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
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  content: string;
};

const ViewPost = (props: Omit<ModalProps, "title" | "content">) => {
  const [data] = useTypedQuery({
    query: {
      getPost: [
        { postId: props.id },
        {
          postId: true,
        },
      ],
    },
  });
  console.log("data: ", data);
  return (
    <Modal {...props} title="Post with comments" content="{content soon}" />
  );
};

const ViewRedditor = (props: Omit<ModalProps, "title" | "content">) => {
  // const [data] = useTypedQuery({

  // })
  return (
    <Modal {...props} title="Redditor post history" content="{content soon}" />
  );
};

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  content,
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

          <div className="flex justify-end text-blue-400">
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
