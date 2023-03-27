import { useComments } from "../../hooks/usePosts";
import { RouterOutputs } from "../../trpc";
import { Content } from "../Reusable/Content";

export const Post = ({
  post,
  selected,
}: {
  post: RouterOutputs["getPostsByPoster"]["data"][number];
  selected: string;
}) => {
  const { postComments: comments } = useComments(post.postId, selected);

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
