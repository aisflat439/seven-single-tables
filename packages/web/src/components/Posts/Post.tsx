import { useComments } from "../../hooks/usePosts";
import { RouterOutputs } from "../../trpc";
import { Button } from "../Reusable/Button";
import { Content } from "../Reusable/Content";
import { Input } from "../Reusable/Input";

export const Post = ({
  post,
  selected,
}: {
  post: RouterOutputs["getPostsByPoster"]["data"][number];
  selected: string;
}) => {
  const {
    postComments: comments,
    handleCreateComment,
    register,
  } = useComments(post.postId, selected);

  return (
    <>
      <form onSubmit={handleCreateComment}>
        <Input {...register("text")} />
        <Button type="submit">Create a comment</Button>
      </form>
      <Content
        text="Comments"
        details={comments.map(({ redditorId, comment }) => ({
          id: redditorId,
          text: comment,
        }))}
      >
        {post.post}
      </Content>
    </>
  );
};
