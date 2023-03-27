import React from "react";
import { RouterOutputs, trpc } from "../trpc";

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
  const { data: comments } = trpc.getCommentsByPoster.useQuery(id);

  return {
    posts: data,
    comments: comments,
    loading: isLoading || isRefetching,
    refetch: refectPosts,
  };
};

export const useComments = (id: string) => {
  const { data: comments } = trpc.getCommentsByPost.useQuery(id);

  return {
    postComments: comments?.data || [],
  };
};

export const usePost = (id: string) => {
  const { data: post } = trpc.getPostsForComment.useQuery(id);

  return {
    post: post?.data || [],
  };
};
