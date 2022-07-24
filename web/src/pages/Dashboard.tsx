export function Dashboard() {
  return (
    <div>
      <article className="max-w-prose">
        <p>
          This project is inspired by{" "}
          <a
            target="__blank"
            href="https://eugenkiss.github.io/7guis/"
            className="underline text-blue-400"
          >
            7GUI's
          </a>{" "}
          and is my attempt to get my mind around Single Table Design.
          Additionally, it follows a few concepts that are popular in software
          engineering and learning circles.
        </p>
        <p>An incomplete list of those concepts would include:</p>
        <ul className="ml-2">
          <li>Learn in public</li>
          <li>The best way to learn is to build something</li>
          <li>10,000 hours</li>
        </ul>
        <p className="mt-8">
          This project wouldn't be possible without the following people,
          technologies, and resources:
        </p>
        <ul className="ml-2">
          <li>
            Alex Debrie and his book{" "}
            <a
              className="underline text-blue-400"
              target="__blank"
              href="
          https://www.dynamodbbook.com/
          "
            >
              The DynamoDB Book
            </a>
          </li>
          <li>
            Rick Houlihan and{" "}
            <a
              className="underline text-blue-400"
              target="__blank"
              href="
          https://www.youtube.com/watch?v=6yqfmXiZTlM
          "
            >
              his talks
            </a>
          </li>
          <li>
            Tyler W. Walch and{" "}
            <a
              className="underline text-blue-400"
              target="__blank"
              href="
          https://github.com/tywalch/electrodb
          "
            >
              the electrodb library
            </a>
          </li>
          <li>
            The entire SST team and{" "}
            <a
              className="underline text-blue-400"
              target="__blank"
              href="
              https://sst.dev/
              "
            >
              their framework
            </a>
          </li>
        </ul>
      </article>
    </div>
  );
}
