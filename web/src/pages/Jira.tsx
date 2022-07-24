import React, { ChangeEvent, ChangeEventHandler } from "react";
import { useTypedMutation, useTypedQuery } from "../urql";

interface TeamForm {
  name: string;
}

export function Jira() {
  const [visibleTeam, setVisibleTeam] = React.useState<string | false>(false);
  const [teams] = useTypedQuery({
    query: {
      teams: { name: true, id: true },
    },
  });

  const [, createTeam] = useTypedMutation((opts: TeamForm) => ({
    createTeam: [
      opts,
      {
        name: true,
      },
    ],
  }));

  const handleViewTickets = (id: string) => {
    setVisibleTeam(id);
  };

  return (
    <div className="px-4">
      <h2 className="text-2xl m-4">Jira</h2>
      <div className="p-2 shadow">
        <div className="max-w-prose my-4">
          <p className="">
            A mini implementation of Jira tickets. In this case we have teams,
            and teams have tickets. They want to get tickets in various states
            of progress, sorted by creation date. The lesson here is partition
            overloading. SK values are either:
            <pre className="mt-1">teamname</pre>
            or
            <pre>"ticket" + ticketid</pre>
          </p>
          <p>
            The point here is that you want to be comfortable with SK having
            multiple different values in it. We can then query for all tickets
            of a given team with a PK of "teamname" and then an SK that begins
            with ticket. Should we need to update a specific value on a given
            ticket, we can use that tickets ID to update just that one value.
          </p>
          <p className="mt-2">
            This example implements the following access patterns:
          </p>
          <ul className="pl-4">
            <li>List all Teams</li>
            <li>List a teams tickets</li>
            <li>Update a ticket</li>
          </ul>
          <p>The table looks roughly like this:</p>
        </div>
        <div className="p-4 ">
          <table className="block overflow-auto whitespace-nowrap">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">PK</th>
                <th className="p-2">SK</th>
                <th className="p-2">Team Name</th>
                <th className="p-2">Team Id</th>
                <th className="p-2">Ticket Title</th>
                <th className="p-2">Ticket Id</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 px-2 text-center">jira</td>
                <td className="py-1 px-2 text-center">jira + team name</td>
                <td className="py-1 px-2 text-center">team name</td>
                <td className="py-1 px-2 text-center">team id</td>
                <td className="py-1 px-2 text-center"></td>
                <td className="py-1 px-2 text-center"></td>
                <td className="py-1 px-2 text-center"></td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-1 px-2 text-center">jira + teamId</td>
                <td className="py-1 px-2 text-center">
                  jira + ticket + ticket id
                </td>
                <td className="py-1 px-2 text-center"></td>
                <td className="py-1 px-2 text-center"></td>
                <td className="py-1 px-2 text-center">ticket title</td>
                <td className="py-1 px-2 text-center">ticket id</td>
                <td className="py-1 px-2 text-center">status</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const name = fd.get("teamName")!.toString();
          if (name) {
            createTeam({
              name,
            });
          }
          e.currentTarget.reset();
        }}
      >
        <div className="my-4 bg-slate-100 p-4">
          <label htmlFor="teamName">Create a team:</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            placeholder="team name"
            className="px-8 py-2 ml-4"
          />
          <button
            disabled={teams.fetching}
            type="submit"
            className={`rounded bg-green-500 px-8 py-2 text-white ml-4 ${
              teams.fetching ? "opacity-50" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="grid grid-cols-2 gap-2">
        {teams.fetching ? (
          <>Loading...</>
        ) : (
          <ul>
            {teams.data?.teams.map((team) => (
              <Team
                {...team}
                key={team.id}
                handleViewTickets={handleViewTickets}
              />
            ))}
          </ul>
        )}
        {visibleTeam && <TeamTickets id={visibleTeam} />}
      </div>
    </div>
  );
}

interface TeamTicketsProps {
  id: string;
}

const TeamTickets = ({ id }: TeamTicketsProps) => {
  const [tickets] = useTypedQuery({
    query: {
      tickets: [
        { id },
        { title: true, teamId: true, ticketId: true, status: true },
      ],
    },
  });

  const hasTickets = tickets.data?.tickets && tickets.data?.tickets?.length > 0;
  const tix = tickets.data?.tickets || [];

  return (
    <div className="border p-8">
      {tickets.fetching ? (
        <>Loading...</>
      ) : (
        <ul>
          {hasTickets ? (
            tix.map((ticket, index) => {
              return (
                <Ticket
                  teamId={ticket.teamId}
                  ticketId={ticket.ticketId}
                  title={ticket.title}
                  even={Boolean(index % 2)}
                  status={ticket.status}
                  key={ticket.ticketId}
                />
              );
            })
          ) : (
            <li>no tickets</li>
          )}
        </ul>
      )}
    </div>
  );
};

interface ITicket {
  ticketId: string;
  even: boolean;
  title: string;
  status: string;
  teamId: string;
}

type Statuses = "pending" | "blocked" | "inprogress" | "complete";

interface StatusForm {
  ticketId: string;
  teamId: string;
  status: Statuses;
}

const Ticket = ({
  ticketId,
  even,
  title,
  status: tStatus,
  teamId,
}: ITicket) => {
  const [status, setStatus] = React.useState<string>(tStatus);
  const [, updateStatus] = useTypedMutation((opts: StatusForm) => ({
    updateStatus: [
      opts,
      {
        teamId: true,
        ticketId: true,
        status: true,
      },
    ],
  }));

  const handleUpdateStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as Statuses;
    setStatus(status);
    updateStatus({ teamId, ticketId, status });
  };

  return (
    <li>
      <div
        className={`p-2 flex justify-between items-center my-2 border border-transparent ${
          even ? "bg-slate-100" : "border-slate-100"
        }`}
      >
        <h6>
          <span className="text-sm text-gray-500 mr-1">title:</span>
          {title}
        </h6>
        <div>
          <label className="text-sm text-gray-500 mr-1">Status:</label>
          <select onChange={handleUpdateStatus} value={status}>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
            <option value="inprogress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      </div>
    </li>
  );
};

interface TicketForm {
  title: string;
  teamId: string;
}

interface Team {
  name: string;
  id: string;
  handleViewTickets: (id: string) => void;
}

const Team = ({ id, name, handleViewTickets }: Team) => {
  const [, create] = useTypedMutation((opts: TicketForm) => ({
    create: [
      opts,
      {
        title: true,
        teamId: true,
      },
    ],
  }));

  return (
    <li>
      <article>
        <div className="border p-2 mb-2">
          <div className="flex justify-between items-center">
            <h5 className="text-2xl">{name}</h5>
            <button
              className="text-blue-400"
              onClick={() => handleViewTickets(id)}
            >
              View tickets
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const title = fd.get("title")!.toString();
              if (title) {
                create({
                  title,
                  teamId: id,
                });
              }
              e.currentTarget.reset();
            }}
          >
            <div className="mt-4 bg-slate-100 p-4">
              <label htmlFor="title">Title:</label>
              <input
                name="title"
                placeholder="ticket title"
                className="ml-4 px-4 py-1"
              />
              <button
                type="submit"
                className="rounded bg-green-500 px-4 py-1 text-white ml-4"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </article>
    </li>
  );
};
