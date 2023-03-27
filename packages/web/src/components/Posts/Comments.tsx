import { usePost } from "../../hooks/usePosts";
import { RouterOutputs } from "../../trpc";
import { Content } from "../Reusable/Content";

export const Comment = ({
  comment,
}: {
  comment: RouterOutputs["getCommentsByPoster"]["data"][number];
}) => {
  const { post } = usePost(comment.postId);

  return (
    <Content
      text="Post"
      details={post.map(({ redditorId, post }) => ({
        id: redditorId,
        text: post,
      }))}
    >
      {comment.comment}
    </Content>
  );
};
