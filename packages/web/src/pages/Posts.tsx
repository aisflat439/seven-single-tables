import { motion } from "framer-motion";
import { Comment } from "../components/Posts/Comments";
import { Post } from "../components/Posts/Post";
import { RedditorListItem } from "../components/Posts/RedditorList";
import { Mark } from "../components/Reusable/Mark";

import { PageDetails } from "../components/Reusable/PageDetails";
import { Spinner } from "../components/Reusable/Spinner";
import { usePoster, usePosters, usePosts } from "../hooks/usePosts";

export function Posts() {
  const { selectedPoster, handleSelect, loading, redditors } = usePosters();
  const { posts } = usePosts();
  const { posts: usersPosts, comments } = usePoster(selectedPoster);

  return (
    <div className="domino p-2 min-h-screen pb-16">
      <div className="max-w-7xl m-auto">
        <PageDetails
          title="Posts"
          subtitle="like reddit"
          accessPattern={[
            "List posts",
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
            In this case we're going to have three entities. Posts (
            <Mark color="blue">posts</Mark>), Comments (
            <Mark color="orange">comments</Mark>) and Redditors (
            <Mark color="green">redditors</Mark>). What we need is more "pk" and
            "sk" values. In Dynamo you can make many extra indexes. They're
            called Global Secondary Indexes and allow you to query on additional
            indexes.
          </p>
          <p>
            The most simple is the list operation. In ElectroDB we'll make an
            index and collection called <Mark color="blue">allPosts</Mark>.
            We'll use a global seconday index for this (
            <Mark color="blue">gsi2pk</Mark> and{" "}
            <Mark color="blue">gsi2sk</Mark> in this case). This is the same as
            the list operation in the Jira example.
          </p>
          <p>
            In the example app, once you select a poster, you see all their
            posts and comments. Those are just two list operations, simliar to
            what we did in the previous table.
          </p>
          <p>
            We'll do a query against every poster{" "}
            <Mark color="pink">pk: = post_posterID-some-uuid, sk: posts_</Mark>.
            We've made a compound key out of the entity itself, along with the
            poster id. The same idea works for comments, just replace "posts"
            with "comments".
          </p>
          <p>
            Each post also has comments. So we need to be able to query for a
            posts, comments. We'll do this by making a compound key for the post
            and the comment. This time our pk will be{" "}
            <Mark color="orange">pk: = postid, sk: postComments_commentId</Mark>
            . The postComments is a collection that we add to ElectroDB and
            we're just using another global secondary index, this time,{" "}
            <Mark color="orange">gsi1pk</Mark> and{" "}
            <Mark color="orange">gsi1sk</Mark>.
          </p>
          <p>
            That's it! Global secondary indexes. Just another way to query your
            data.
          </p>
        </PageDetails>
        <h3 className="text-2xl bg-white inline-block px-2 py-1 border-2 border-black rounded-sm">
          All Posts
        </h3>
        <div className="mb-6">
          <motion.div layout className="grid sm:grid-cols-2 gap-4 mt-6 ">
            {posts?.map((post) => {
              return (
                <Post post={post} key={post.postId} selected={selectedPoster} />
              );
            })}
          </motion.div>
        </div>
        <h3 className="text-2xl bg-white inline-block px-2 py-1 border-2 border-black rounded-sm">
          All Posters
        </h3>
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
          <h3 className="text-2xl bg-white inline-block px-2 py-1 border-2 border-black rounded-sm">
            Posts
          </h3>
          <motion.div layout className="grid sm:grid-cols-2 gap-4 mt-6 ">
            {usersPosts?.data.map((post) => {
              return (
                <Post post={post} key={post.postId} selected={selectedPoster} />
              );
            })}
          </motion.div>
        </div>
        <div>
          <h3 className="text-2xl bg-white inline-block px-2 py-1 border-2 border-black rounded-sm">
            Comments
          </h3>
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
