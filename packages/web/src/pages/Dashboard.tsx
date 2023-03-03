import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Card } from "../components/Card";

export function Dashboard() {
  return (
    <>
      <div className="bg-green-600 border-b-2 border-black">
        <div className="max-w-screen-xl m-auto">
          <article className="max-w-prose py-12 sm:py-24 px-4 md:px-0 m-auto">
            <h2 className="text-4xl sm:text-6xl underline text-center pb-6">
              What is this?
            </h2>
            <p className="prose-lg">
              In an effort to get more comfortable with Single Table Design and
              SST's opinions about how applications should be built, I've
              created this project.
            </p>
          </article>
        </div>
      </div>
      <div className="border-b-2 border-black">
        <div className="max-w-screen-xl p-4 md:py-24  m-auto">
          <article className="max-w-prose m-auto prose-lg bg-fuchsia-500 border-2 border-black p-4 rounded">
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
      <div className="bg-black pb-12">
        <div className="max-w-screen-xl py-12 m-auto">
          <article className="">
            <p className="text-white prose-2xl max-w-prose m-auto pb-8 px-4">
              This project wouldn't be possible without the following people,
              technologies, and resources:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-8">
              <Card
                color="orange"
                link="https://sst.dev/"
                linkText="SST Framework"
                subtitle="their community and the"
                title="SST"
              />
              <Card
                color="yellow"
                link="https://electrodb.dev/en/core-concepts/introduction/"
                linkText="ElectroDB"
                subtitle="and his library"
                title="Tyler W. Walch"
              />
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
            </ul>
          </article>
        </div>
      </div>
      <div className="bg-gray-200">
        <div className="max-w-screen-xl py-12 m-auto">
          <section>
            <h3 className="text-5xl text-center py-6 text-indigo-900 uppercase">
              Examples
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-8">
              <li>
                <Link to="jira">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "4px 4px 0 2px #000",
                    }}
                    initial={{ boxShadow: "none" }}
                    className="border-black border-2 rounded p-4 flex"
                  >
                    <h5>Jira:</h5>
                    <p className="ml-4">
                      The simplest example of Single Table Design
                    </p>
                  </motion.div>
                </Link>
              </li>
              <li>
                <Link to="posts">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "4px 4px 0 2px #000",
                    }}
                    initial={{ boxShadow: "none" }}
                    className="border-black border-2 rounded p-4 flex"
                  >
                    <h5>Posts:</h5>
                    <p className="ml-4">
                      All we add is GSI's so understand how that works
                    </p>
                  </motion.div>
                </Link>
              </li>
              <li>
                <Link to="orders">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "4px 4px 0 2px #000",
                    }}
                    initial={{ boxShadow: "none" }}
                    className="border-black border-2 rounded p-4 flex"
                  >
                    <h5>Orders:</h5>
                    <p className="ml-4">
                      A simplified version of a talk by from Rick Houlihan
                    </p>
                  </motion.div>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
