import { Link } from "react-router-dom";
import { useTypedMutation, useTypedQuery } from "../urql";

export function Main() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Main</h2>
      <ul>
        <Link to="/jira">Jira</Link>
      </ul>
    </div>
  );
}
