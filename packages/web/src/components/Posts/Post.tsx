import { useComments } from "../../hooks/usePosts";
import { RouterOutputs } from "../../trpc";
import { Content } from "../Reusable/Content";

export const Post = ({
  post,
}: {
  post: RouterOutputs["getPostsByPoster"]["data"][number];
}) => {
  const { postComments: comments } = useComments(post.postId);

  return (
    <Content
      text="Comments"
      details={comments.map(({ redditorId, comment }) => ({
        id: redditorId,
        text: comment,
      }))}
    >
      {post.post}
    </Content>
  );
};
