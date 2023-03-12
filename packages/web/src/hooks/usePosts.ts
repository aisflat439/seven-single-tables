import { trpc } from "../trpc";

export const usePosts = () => {
  const {
    data,
    refetch: refetchTeams,
    isLoading,
    isRefetching,
  } = trpc.listPosts.useQuery();

  return {
    posts: data || [],
  };
};
