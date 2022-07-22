import { Link } from "react-router-dom";

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
