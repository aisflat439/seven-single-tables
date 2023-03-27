import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RouterOutputs, trpc } from "../trpc";

type TCreatePost = {
  text: RouterOutputs["createTicket"]["title"];
};

type TCreateComment = {
  text: RouterOutputs["createComment"]["data"]["comment"];
  postId: RouterOutputs["createComment"]["data"]["postId"];
};

export const usePosters = () => {
  const { data: redditors, isLoading } = trpc.listRedditors.useQuery();

  const [selected, setSelected] = React.useState<string>("");

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  return {
    redditors: redditors?.data || [],
    loading: isLoading,
    handleSelect,
    selectedPoster: selected,
  };
};

export const usePoster = (id: string) => {
  const {
    data,
    refetch: refectPosts,
    isLoading,
    isRefetching,
  } = trpc.getPostsByPoster.useQuery(id);
  const { register, handleSubmit } = useForm<TCreatePost>();
  const { data: comments } = trpc.getCommentsByPoster.useQuery(id);

  const create = trpc.create.useMutation({});

  const handleCreatePost: SubmitHandler<TCreatePost> = (data) => {
    create.mutate({ redditorID: id, post: data.text });
  };

  return {
    comments: comments,
    handleCreatePost: handleSubmit(handleCreatePost),
    loading: isLoading || isRefetching,
    posts: data,
    register,
    refetch: refectPosts,
  };
};

export const useComments = (postID: string, redditorID?: string) => {
  const { data: comments } = trpc.getCommentsByPost.useQuery(postID);
  const comment = trpc.createComment.useMutation({});
  const { register, handleSubmit } = useForm<TCreateComment>();

  const handleCreateComment: SubmitHandler<TCreateComment> = (data) => {
    comment.mutate({
      redditorID: redditorID || "",
      comment: data.text,
      postID,
    });
  };

  return {
    handleCreateComment: handleSubmit(handleCreateComment),
    postComments: comments?.data || [],
    register,
  };
};

export const usePost = (id: string) => {
  const { data: post } = trpc.getPostsForComment.useQuery(id);

  return {
    post: post?.data || [],
  };
};

export const usePosts = () => {
  const { data: posts, isLoading } = trpc.list.useQuery();

  return {
    posts: posts?.data || [],
    loading: isLoading,
  };
};
