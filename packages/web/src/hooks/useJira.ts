import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { RouterOutputs, trpc } from "../trpc";

type TCreateTeam = {
  name: RouterOutputs["createTeam"]["name"];
};

type TCreateTicket = {
  title: RouterOutputs["createTicket"]["title"];
};

export const useJiraTicket = (id: string) => {
  const {
    data: tickets,
    refetch,
    isLoading,
    isRefetching,
  } = trpc.listTickets.useQuery(id);
  const { register, handleSubmit, reset } = useForm<TCreateTicket>();
  const { session } = useUser();

  const createTicket = trpc.createTicket.useMutation({
    onSuccess: () => {
      refetch();
      reset();
    },
  });

  const updateStatus = trpc.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateTicket: SubmitHandler<TCreateTicket> = (data) => {
    Boolean(session)
      ? createTicket.mutate({ title: data.title, teamId: id })
      : toast.error("You must be logged in to create a ticket");
  };

  const handleChangeStatus = (
    status: string,
    ticket: RouterOutputs["listTickets"][0]
  ) => {
    updateStatus.mutate({
      ticketId: ticket.ticketId,
      teamId: ticket.teamId,
      status,
    });
  };

  return {
    handleCreateTicket: handleSubmit(handleCreateTicket),
    handleChangeStatus,
    tickets: tickets || [],
    register,
    isLoading: isLoading || isRefetching || createTicket.isLoading,
    isTicketsLoading: updateStatus.isLoading || isRefetching,
  };
};

export const useJiraTeam = () => {
  const { register, handleSubmit, reset } = useForm<TCreateTeam>();
  const {
    data,
    refetch: refetchTeams,
    isLoading,
    isRefetching,
  } = trpc.listTeams.useQuery();
  const { session } = useUser();

  const createTeam = trpc.createTeam.useMutation({
    onSuccess: () => {
      refetchTeams();
      reset();
    },
  });

  const deleteTeam = trpc.deleteTeam.useMutation({
    onSuccess: () => {
      refetchTeams();
    },
  });

  const mutating = isLoading || isRefetching || createTeam.isLoading;

  const handleCreateTeam: SubmitHandler<TCreateTeam> = (data) => {
    Boolean(session)
      ? createTeam.mutate(data.name)
      : toast.error("You must be logged in to create a team");
  };

  const handleDeleteTeam = (id: string) => {
    Boolean(session)
      ? deleteTeam.mutate(id)
      : toast.error("You must be logged in to delete a team");
  };

  return {
    register,
    teams: data || [],
    handleCreateTeam: handleSubmit(handleCreateTeam),
    loading: mutating,
    handleDeleteTeam,
    deleting: deleteTeam.isLoading,
  };
};
