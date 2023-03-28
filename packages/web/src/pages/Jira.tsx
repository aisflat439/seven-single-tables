import { AnimatePresence, motion } from "framer-motion";

import { Button } from "../components/Reusable/Button";
import { Input } from "../components/Reusable/Input";
import { TeamCard } from "../components/Jira/TeamCard";
import { useJiraTeam } from "../hooks/useJira";
import { PageDetails } from "../components/Reusable/PageDetails";
import { Mark } from "../components/Reusable/Mark";

export function Jira() {
  const { teams, register, handleCreateTeam, loading } = useJiraTeam();

  return (
    <div className="bg-blue-600 p-2 min-h-screen">
      <div className="max-w-7xl m-auto">
        <PageDetails
          title="Jira"
          accessPattern={[
            "Create and delete a team",
            "Retrieve all the teams",
            "Create a ticket for a team",
            "Retrieve all the tickets for a team",
            "Change the status of a ticket",
          ]}
        >
          <p>
            Everything in DynamoDB works with primary keys and sort keys. From
            here forward, think of them as "sk" and "pk". You can have many of
            both. Rather than having a table with an index that references
            another table. In Dynamo, we keep everything together on one table.
            This relational data strategy is called "single table design."
          </p>
          <p>
            In this data model, we have Teams and Tickets. Teams have-many
            tickets. We have two access patterns. Retrieve all the teams.
            Retrieve all of the tickets of a team. Additionally, we set up
            deleting a team and updating ticket statuses just for fun!
          </p>
          <p>
            We have two entity types. Teams and Tickets. In ElectroDB we create
            collections to group like items. In this case, we name the
            collection <span className="bg-blue-100 p-1">jira</span>. The
            primary key for a team is
            <span className="bg-green-200 p-1">
              pk: = jira, sk: = teamId_some-team-id
            </span>
            . If we wanted all of the teams, we can just get{" "}
            <span className="bg-yellow-100 p-1">pk: = jira, sk: = teamId_</span>
            . This covers two of our access patterns!
          </p>
          <p>
            For ticket entity types, we can want to list all the tickets of a
            team. We're still using the same collection id{" "}
            <span className="bg-blue-100 p-1">jira</span>
            But now we add in a{" "}
            <span className="bg-indigo-100 p-1">teamId</span>. So if we want to
            list all the tickets for a team can say{" "}
            <Mark color="orange">pk: = jira_some-team-id, sk: ticketId_</Mark>
          </p>
          <p>
            If you look at the table, you can have pk's with{" "}
            <span className="bg-pink-100 p-1">jira</span> or{" "}
            <span className="bg-purple-100 p-1">jira_team-id</span>
          </p>
          <p>You can see details of the above functions here.</p>
          <ul className="list-none">
            <li>
              <a
                href="https://github.com/aisflat439/seven-single-tables/blob/main/packages/core/src/jira.ts#L108"
                target="_blank"
              >
                listTeams()
              </a>
            </li>
            <li>
              <a href="https://github.com/aisflat439/seven-single-tables/blob/main/packages/core/src/jira.ts#L127">
                listTickets()
              </a>
            </li>
            <li>
              <a href="https://github.com/aisflat439/seven-single-tables/blob/main/packages/core/src/jira.ts#L135">
                updateStatus()
              </a>
            </li>
          </ul>
        </PageDetails>
        <form onSubmit={handleCreateTeam}>
          <Input {...register("name")} />
          <Button type="submit" disabled={loading}>
            {loading ? "working..." : "Add a team"}
          </Button>
        </form>
        <motion.div
          layout
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6"
        >
          <AnimatePresence>
            {teams.map((team) => (
              <TeamCard team={team} key={team.teamId} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
