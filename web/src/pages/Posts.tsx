import { useTypedQuery } from "../urql";

export const Posts = () => {
  const [redditors] = useTypedQuery({
    query: {
      redditors: { redditorId: true, name: true },
    },
  });

  return (
    <>
      <h2 className="text-2xl m-4">Posts</h2>
      <div className="p-2 shadow">
        <div className="max-w-prose my-4">
          <p className="">Not quite hacker news or reddit.</p>
        </div>
        <p className="mt-2">
          This example implements the following access patterns:
        </p>
        <ul className="pl-4">
          <li>List posts</li>
          <li>List comments for a post</li>
          <li>List posts by poster</li>
          <li>List comments by poster</li>
        </ul>
      </div>
      <div className="my-4">
        {!redditors.fetching ? (
          <>
            <label>Select a user to see their post history</label>
            <select>
              {redditors.data?.redditors.map((r) => (
                <option key={r.redditorId}>{r.name}</option>
              ))}
            </select>
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
};
