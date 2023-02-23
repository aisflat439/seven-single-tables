import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useBoolean } from "usehooks-ts";
import { useJiraTeam, useJiraTicket } from "../../hooks/useJira";
import { RouterOutputs } from "../../trpc";
import { Button } from "../Button";
import { Input } from "../Input";

export const TeamCard: React.FC<{
  team: RouterOutputs["listTeams"][number];
}> = ({ team }) => {
  const { handleDeleteTeam, deleting } = useJiraTeam();
  const { tickets, register, handleCreateTicket, isLoading } = useJiraTicket(
    team.teamId
  );

  const { value: creating, toggle, setFalse } = useBoolean(false);
  const { value: viewing, toggle: toggleViewing } = useBoolean(false);

  return (
    <motion.article key={team.teamId} className={"bg-yellow-400 p-4 h-fit"}>
      <div className="flex justify-between">
        <h2 className="text-3xl text-indigo-900">{team.name}</h2>
        <Button
          disabled={deleting}
          variant="destructive"
          onClick={() => handleDeleteTeam(team.teamId)}
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex justify-between my-2">
        <Button
          onClick={() => {
            setFalse();
            toggleViewing();
          }}
          variant="brick"
          className="flex justify-center items-center"
        >
          {viewing || !tickets.length ? (
            <EyeSlashIcon className="h-6 w-6 mr-2" />
          ) : (
            <EyeIcon className="h-6 w-6 mr-2" />
          )}{" "}
          Tickets
        </Button>
        <Button onClick={toggle}>
          {creating ? "Hide create view" : "Create a ticket"}
        </Button>
      </div>
      <AnimatePresence>
        {creating && (
          <motion.div
            key="create-mode"
            initial="closed"
            exit="closed"
            animate="open"
            variants={{
              open: { height: "auto", transition: { delayChildren: 0.1 } },
              closed: { height: 0, transition: { delayChildren: -1 } },
            }}
          >
            <motion.form
              onSubmit={handleCreateTicket}
              className="py-4"
              variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
            >
              <Input {...register("title")} />
              <Button type="submit" disabled={isLoading}>
                add ticket
              </Button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {Boolean(tickets.length) &&
            viewing &&
            tickets.map((ticket) => (
              <Ticket ticket={ticket} key={ticket.ticketId} />
            ))}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};

const Ticket = ({
  ticket,
}: {
  ticket: RouterOutputs["listTickets"][number];
}) => {
  return (
    <motion.div
      initial="closed"
      exit="closed"
      animate="open"
      variants={{
        open: { height: "auto", transition: { delayChildren: 0.1 } },
        closed: { height: 0, transition: { delayChildren: -1 } },
      }}
      key={ticket.ticketId}
    >
      <motion.div variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}>
        <div className="bg-lime-500 p-2 border-2 border-black">
          <h3 className="text-xl">
            <span className="text-xs pr-2">title:</span>
            {ticket.title}
          </h3>
          <ul className="flex flex-wrap">
            <TicketStatus ticket={ticket} status="pending">
              pending
            </TicketStatus>
            <TicketStatus ticket={ticket} status="blocked">
              blocked
            </TicketStatus>
            <TicketStatus ticket={ticket} status="inprogress">
              in progress
            </TicketStatus>
            <TicketStatus ticket={ticket} status="complete">
              complete
            </TicketStatus>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TicketStatus = ({
  ticket,
  children,
  status,
}: {
  ticket: RouterOutputs["listTickets"][number];
  children: React.ReactNode;
  status: "pending" | "blocked" | "inprogress" | "complete";
}) => {
  const { handleChangeStatus, isTicketsLoading } = useJiraTicket(ticket.teamId);

  return (
    <li onClick={() => handleChangeStatus(status, ticket)}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className={`px-2 py-1 text-sm rounded-full m-2 ${
          ticket.status === status
            ? "bg-violet-500 text-white"
            : "bg-violet-100 text-violet-500"
        }
            ${isTicketsLoading ? "cursor-not-allowed" : "hover:cursor-pointer"}
        }`}
      >
        {children}
      </motion.div>
    </li>
  );
};
