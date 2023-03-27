import { motion } from "framer-motion";
import { Comment } from "../components/Posts/Comments";
import { Post } from "../components/Posts/Post";
import { RedditorListItem } from "../components/Posts/RedditorList";
import { Button } from "../components/Reusable/Button";
import { Input } from "../components/Reusable/Input";

import { PageDetails } from "../components/Reusable/PageDetails";
import { Spinner } from "../components/Reusable/Spinner";
import { usePoster, usePosters, usePosts } from "../hooks/usePosts";

export function Posts() {
  const { selectedPoster, handleSelect, loading, redditors } = usePosters();
  const { posts, loading: isPostsLoading } = usePosts();
  const {
    posts: usersPosts,
    comments,
    handleCreatePost,
    register,
  } = usePoster(selectedPoster);

  return (
    <div className="bg-orange-500 p-2 min-h-screen">
      <div className="max-w-7xl m-auto">
        <PageDetails
          title="Posts"
          accessPattern={[
            "List comments by redditor",
            "List posts by redditor",
            "List a posts comments",
            "Get the post from a comment",
          ]}
        >
          <p>
            With this table we see some new patterns for single table design.
            Posts can have many comments. Comments belong to a post but also to
            a redditor. With DynamoDB and a single table, how can we do this?
          </p>
          <p>
            In the example app, once you select a poster, you see all their
            posts and comments. Those are just two list operations, simliar to
            what we did in the previous table.
          </p>
          <p>
            We'll do a query against every poster{" "}
            <span className="bg-orange-100 p-1">
              pk: = post_posterID-some-uuid, sk: posts_
            </span>
            . We've made a compound key out of the collection itself, along with
            the poster id. The same idea works for comments, just replace
            "posts" with "comments".
          </p>
          <p>
            The new idea is that an entity can belong to more than one
            collection. In this case, a comment belongs to both a post and a
            redditor. To view the comments of a posts, we query the posts
            comments. Using a GSI <span className="bg-indigo-100"></span>
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
        <div className="mb-6">
          <motion.div layout className="grid sm:grid-cols-2 gap-4 mt-6 ">
            {posts?.map((post) => {
              return (
                <Post post={post} key={post.postId} selected={selectedPoster} />
              );
            })}
          </motion.div>
        </div>
        <form onSubmit={handleCreatePost}>
          <Input {...register("text")} />
          <Button type="submit" disabled={loading || !selectedPoster}>
            {loading ? "working..." : "Create a post"}
          </Button>
        </form>
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
            {usersPosts?.data.map((post) => {
              return (
                <Post post={post} key={post.postId} selected={selectedPoster} />
              );
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
