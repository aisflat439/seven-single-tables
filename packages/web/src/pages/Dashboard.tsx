import { Link } from "react-router-dom";
import { Card } from "../components/Card";

export function Dashboard() {
  return (
    <>
      <div className="bg-green-600 border-b-2 border-black">
        <div className="max-w-screen-xl m-auto">
          <article className="max-w-prose py-24 m-auto">
            <h2 className="prose-2xl underline text-center">What is this?</h2>
            <p className="prose-lg">
              In an effort to get more comfortable with Single Table Design and
              SST's opinions about how applications should be built, I've
              created this project.
            </p>
          </article>
        </div>
      </div>
      <div className="border-b-2 border-black">
        <div className="max-w-screen-xl py-24 m-auto">
          <article className="max-w-prose m-auto prose-lg bg-fuchsia-500 border-2 border-black p-4">
            <p>
              This project is inspired by{" "}
              <a
                target="__blank"
                href="https://eugenkiss.github.io/7guis/"
                className="underline"
              >
                7GUI's
              </a>{" "}
              and is my attempt to get my mind around Single Table Design.
              Additionally, it follows a few concepts that are popular in
              software engineering and learning circles.
            </p>
            <p>An incomplete list of those concepts would include:</p>
            <ul className="ml-2">
              <li className="mt-0">Learn in public</li>
              <li className="mt-0">
                The best way to learn is to build something
              </li>
              <li className="mt-0">10,000 hours</li>
            </ul>
          </article>
        </div>
      </div>
      <div className="bg-black">
        <div className="max-w-screen-xl py-12 m-auto">
          <article className="">
            <p className="text-white prose-2xl max-w-prose m-auto pb-8">
              This project wouldn't be possible without the following people,
              technologies, and resources:
            </p>
            <ul className="grid grid-cols-2 gap-6 px-8">
              <Card
                color="green"
                link="https://www.dynamodbbook.com/"
                linkText="The DynamoDB Book"
                subtitle="and his book"
                title="Alex Debrie"
              />
              <Card
                color="blue"
                link="https://www.youtube.com/watch?v=6yqfmXiZTlM"
                linkText="his talks"
                subtitle="and"
                title="Rick Houlihan"
              />
              <Card
                color="yellow"
                link="https://electrodb.dev/en/core-concepts/introduction/"
                linkText="ElectroDB"
                subtitle="and his library"
                title="Tyler W. Walch"
              />
              <Card
                color="orange"
                link="https://sst.dev/"
                linkText="SST Framework"
                subtitle="their community and the"
                title="SST"
              />
            </ul>
          </article>
        </div>
      </div>
      <div className="bg-gray-200">
        <div className="max-w-screen-xl py-12 m-auto">
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
    </>
  );
}
