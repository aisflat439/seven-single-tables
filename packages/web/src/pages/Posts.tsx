import { motion } from "framer-motion";
import React from "react";
import { RedditorListItem } from "../components/Posts/RedditorList";
import { Button } from "../components/Reusable/Button";
import { Input } from "../components/Reusable/Input";

import { PageDetails } from "../components/Reusable/PageDetails";
import { usePosts } from "../hooks/usePosts";

export function Posts() {
  const { loading, register, handleCreateRedditor, redditors } = usePosts();
  const [selected, setSelected] = React.useState<string>("");

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  return (
    <div className="bg-orange-500 p-2 min-h-screen">
      <div className="max-w-7xl m-auto">
        <PageDetails
          title="Posts"
          accessPattern={[
            "Create a redditor",
            "Create a post",
            "Comment on the post",
            "List Comments",
            "List Posts",
          ]}
        >
          <p>
            Here's where I'll talk about what Posts is all about. I don't know
            what I'll say because I haven't written it yet. This is just
            placeholder text
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
        </PageDetails>
        <form onSubmit={handleCreateRedditor}>
          <Input {...register("name")} />
          <Button type="submit" disabled={loading}>
            {loading ? "working..." : "create a redditor"}
          </Button>
        </form>
        <motion.div layout className="grid sm:grid-cols-3 gap-4 mt-6 ">
          {redditors.map((redditor, index) => {
            return (
              <RedditorListItem
                index={index}
                redditor={redditor}
                key={redditor.redditorId}
                handleSelect={handleSelect}
                isChecked={selected === redditor.redditorId}
              />
            );
          })}
        </motion.div>
        <motion.div
          layout
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 "
        >
          {/* {posts.map((post) => {
            return <Post post={post} key={post.id} />;
          })} */}
        </motion.div>
      </div>
    </div>
  );
}
