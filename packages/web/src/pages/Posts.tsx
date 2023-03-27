import { motion } from "framer-motion";
import { Comment } from "../components/Posts/Comments";
import { Post } from "../components/Posts/Post";
import { RedditorListItem } from "../components/Posts/RedditorList";

import { PageDetails } from "../components/Reusable/PageDetails";
import { Spinner } from "../components/Reusable/Spinner";
import { usePoster, usePosters } from "../hooks/usePosts";

export function Posts() {
  const { selectedPoster, handleSelect, loading, redditors } = usePosters();
  console.log("redditors: ", redditors);
  const { posts, comments } = usePoster(selectedPoster);

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
        <motion.div layout className="grid sm:grid-cols-3 gap-4 mt-6 mb-6">
          {loading ? (
            <>
              <div />
              <div className="flex justify-center">
                <Spinner />
              </div>
            </>
          ) : (
            <>
              {redditors.map((redditor, index) => {
                return (
                  <RedditorListItem
                    index={index}
                    redditor={redditor}
                    key={redditor.redditorId}
                    handleSelect={handleSelect}
                    isChecked={selectedPoster === redditor.redditorId}
                  />
                );
              })}
            </>
          )}
        </motion.div>
        <div className="mb-6">
          <h3 className="text-2xl underline">Posts</h3>
          <motion.div layout className="grid sm:grid-cols-2 gap-4 mt-6 ">
            {posts?.data.map((post) => {
              return <Post post={post} key={post.postId} />;
            })}
          </motion.div>
        </div>
        <div>
          <h3 className="text-2xl underline">Comments</h3>
          <motion.div layout className="grid sm:grid-cols-2 gap-4 mt-6 ">
            {comments?.data.map((comment) => {
              return <Comment comment={comment} key={comment.commentId} />;
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
