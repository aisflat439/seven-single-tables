import { AnimatePresence, motion } from "framer-motion";

import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { TeamCard } from "../components/Jira/TeamCard";
import { useJiraTeam } from "../hooks/useJira";

export function Jira() {
  const { teams, register, handleCreateTeam, loading } = useJiraTeam();

  return (
    <div className="bg-blue-600 p-2 min-h-screen">
      <div className="max-w-7xl m-auto">
        <h2 className="text-4xl m-4 text-white underline">Jira</h2>
        <div>
          <form onSubmit={handleCreateTeam}>
            <Input {...register("name")} />
            <Button type="submit" disabled={loading}>
              {loading ? "working..." : "Add a team"}
            </Button>
          </form>
        </div>
        <motion.div
          layout
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 bg-blue-600"
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
