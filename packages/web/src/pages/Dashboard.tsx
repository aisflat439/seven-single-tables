import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Card } from "../components/Reusable/Card";

export function Dashboard() {
  return (
    <>
      <div className="bg-green-600 border-b-2 border-black">
        <div className="max-w-screen-xl m-auto">
          <svg
            className="ml-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="60px"
            height="60px"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#22C522"
              d="m308.352 489.344 226.304 226.304a32 32 0 0 0 45.248 0L783.552 512A192 192 0 1 0 512 240.448L308.352 444.16a32 32 0 0 0 0 45.248zm135.744 226.304L308.352 851.392a96 96 0 0 1-135.744-135.744l135.744-135.744-45.248-45.248a96 96 0 0 1 0-135.808L466.752 195.2A256 256 0 0 1 828.8 557.248L625.152 760.96a96 96 0 0 1-135.808 0l-45.248-45.248zM398.848 670.4 353.6 625.152 217.856 760.896a32 32 0 0 0 45.248 45.248L398.848 670.4zm248.96-384.64a32 32 0 0 1 0 45.248L466.624 512a32 32 0 1 1-45.184-45.248l180.992-181.056a32 32 0 0 1 45.248 0zm90.496 90.496a32 32 0 0 1 0 45.248L557.248 602.496A32 32 0 1 1 512 557.248l180.992-180.992a32 32 0 0 1 45.312 0z"
            />
          </svg>
          <article className="max-w-prose py-12 sm:pb-24 sm:pt-12 px-4 md:px-0 m-auto">
            <h2 className="text-4xl sm:text-8xl text-center pb-6">
              What is this?
            </h2>
            <p className="prose-xl pb-6">
              Seven sample tables for demonstrating Single Table Design.
            </p>
            <p className="prose-lg pb-6">
              In an effort to get more comfortable with Single Table Design and
              SST's opinions about how applications should be built, I've
              created this project. The intent is that each table gets
              progressively more complicated. The growing complexity will show
              how Single Table Design works along with an example of how I'd
              implement it.
            </p>
            <p className="prose-sm text-black">
              <span className="text-red-500">*</span>
              Also, I'm having fun making the sites design as close to a trapper
              keeper as I can. Trapper keepers were the best.
            </p>
          </article>
        </div>
      </div>
      <div className="border-b-2 border-black jigsaw">
        <div className="max-w-screen-xl p-4 md:py-24 m-auto">
          <article className="max-w-prose m-auto prose-lg bg-fuchsia-400 border-2 border-black p-4 rounded">
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
