import { useTypedMutation, useTypedQuery } from "../urql";

interface TeamForm {
  name: string;
}

export function Tickets() {
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

  return (
    <div className="p-8">
      <h2 className="text-2xl">Tickets</h2>
      <p className="max-w-prose">
        A mini implementation of Jira tickets. In this case we have teams, and
        teams have tickets. They want to get tickets in various states of
        progress, sorted by creation date.
      </p>
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
        <input name="teamName" placeholder="team name" />
        <button type="submit">Submit</button>
      </form>
      <h3>Teams</h3>
      <ul>
        {teams.data?.teams.map((team) => (
          <TeamItem {...team} />
        ))}
      </ul>
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
}

const TeamItem = ({ id, name }: Team) => {
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
    <li key={id}>
      <article>
        <h5>{name}</h5>
        <p>create a ticket for this team</p>
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
          <input name="title" placeholder="ticket title" />
          <button type="submit">Create</button>
        </form>
      </article>
    </li>
  );
};
