import { useForm, SubmitHandler } from "react-hook-form";
import { RouterOutputs, trpc } from "../trpc";

type TCreateTeam = {
  name: string;
};

type TCreateTicket = {
  title: string;
};

export const useJiraTicket = (id: string) => {
  const {
    data: tickets,
    refetch,
    isLoading,
    isRefetching,
  } = trpc.listTickets.useQuery(id);
  const { register, handleSubmit, reset } = useForm<TCreateTicket>();

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
    createTicket.mutate({ title: data.title, teamId: id });
  };

  const handleChangeStatus = (
    status: string,
    ticket: RouterOutputs["listTickets"][number]
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
    createTeam.mutate(data.name);
  };

  const handleDeleteTeam = (id: string) => {
    deleteTeam.mutate(id);
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
