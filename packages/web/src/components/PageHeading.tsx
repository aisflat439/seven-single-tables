import { Button } from "./Button";

export const PageHeading = ({
  accessPattern,
  show,
  title,
  toggle,
}: {
  accessPattern: string[];
  show: boolean;
  title: string;
  toggle: () => void;
}) => (
  <article className="bg-white border-2 border-black rounded my-8">
    <div className="flex justify-between p-4">
      <h1 className=" text-4xl">{title}</h1>
      <Button
        disabled={show}
        onClick={toggle}
        variant="informational"
        className="text-sm"
      >
        What's happening?
      </Button>
    </div>
    <p className="m-4">Implement a table with the following access patterns:</p>
    <ul className="pl-6 m-4">
      {accessPattern.map((pattern) => (
        <li key={pattern}>{pattern}</li>
      ))}
    </ul>
  </article>
);
