import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="bg-green-600">
      <div className="max-w-screen-xl m-auto">
        <article className="max-w-prose py-12 m-auto">
          <h2 className="prose-2xl underline text-center">What is this?</h2>
          <p className="prose-lg">
            In an effort to get more comfortable with Single Table Design and
            SST's opinions about how applications should be built, I've created
            this project.
          </p>
        </article>
      </div>

      <div className="max-w-screen-xl m-auto">
        <article className="max-w-prose p-2 m-2">
          <p>
            This project is inspired by{" "}
            <a
              target="__blank"
              href="https://eugenkiss.github.io/7guis/"
              className="underline text-blue-400"
            >
              7GUI's
            </a>
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
                href="https://www.dynamodbbook.com/"
              >
                The DynamoDB Book
              </a>
            </li>
            <li>
              Rick Houlihan and{" "}
              <a
                className="underline text-blue-400"
                target="__blank"
                href="https://www.youtube.com/watch?v=6yqfmXiZTlM"
              >
                his talks
              </a>
            </li>
            <li>
              Tyler W. Walch and{" "}
              <a
                className="underline text-blue-400"
                target="__blank"
                href="https://github.com/tywalch/electrodb"
              >
                the electrodb library
              </a>
            </li>
            <li>
              The entire SST team and{" "}
              <a
                className="underline text-blue-400"
                target="__blank"
                href="https://sst.dev/"
              >
                their framework
              </a>
            </li>
          </ul>
        </article>
        <section>
          <ul>
            <li>
              <Link to="jira">
                <div className="shadow p-4 my-4 flex">
                  <h5>Jira:</h5>
                  <p className="ml-4">
                    The simplest example of Single Table Design
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="posts">
                <div className="shadow p-4 my-4 flex">
                  <h5>Posts:</h5>
                  <p className="ml-4">
                    All we add is GSI's so understand how that works
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="orders">
                <div className="shadow p-4 my-4 flex">
                  <h5>Orders:</h5>
                  <p className="ml-4">
                    A simplified version of a talk by from Rick Houlihan
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
