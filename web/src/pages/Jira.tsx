import React from "react";
import { useTypedMutation, useTypedQuery } from "../urql";

interface TeamForm {
  name: string;
}

export function Jira() {
  const [visibleTeam, setVisibleTeam] = React.useState<String | false>(false);
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
    <div className="p-8">
      <h2 className="text-2xl">Jira</h2>
      <div className="p-2 max-w-prose shadow my-4">
        <p className="">
          A mini implementation of Jira tickets. In this case we have teams, and
          teams have tickets. They want to get tickets in various states of
          progress, sorted by creation date.
        </p>
        <p className="">
          A mini implementation of Jira tickets. In this case we have teams, and
          teams have tickets. They want to get tickets in various states of
          progress, sorted by creation date.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          createTeam({
            name: fd.get("teamName")!.toString(),
          });
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
      <h3>Teams</h3>
      <div className="grid grid-cols-2 gap-2">
        {teams.fetching ? (
          <div className="flex justify-center items-center m-12">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span className="invisible">Loading...</span>
            </div>
          </div>
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
        <div>viewsection</div>
      </div>
    </div>
  );
}

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
              create({
                title: fd.get("title")!.toString(),
                teamId: id,
              });
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
