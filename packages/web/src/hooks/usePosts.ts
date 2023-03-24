import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { RouterOutputs, trpc } from "../trpc";

type TCreateRedditor = {
  name: RouterOutputs["createRedditor"]["data"]["name"];
};

export const usePosts = () => {
  const {
    data,
    refetch: refectPosts,
    isLoading,
    isRefetching,
  } = trpc.listPosts.useQuery();
  const {
    data: redditors,
    refetch: refectRedditors,
    isLoading: isLoadingRedditors,
  } = trpc.listRedditors.useQuery();

  const { session } = useUser();
  const { register, handleSubmit, reset } = useForm<TCreateRedditor>();

  const createRedditor = trpc.createRedditor.useMutation({
    onSuccess: () => {
      refectPosts();
      reset();
    },
  });

  const handleCreateRedditor: SubmitHandler<TCreateRedditor> = (data) => {
    Boolean(session)
      ? createRedditor.mutate(data.name)
      : toast.error("You must be logged in to create a ticket");
  };

  return {
    posts: data?.data || [],
    redditors: redditors?.data || [],
    handleCreateRedditor: handleSubmit(handleCreateRedditor),
    loading:
      isLoading || isLoadingRedditors || isRefetching || isLoadingRedditors,
    register,
  };
};
