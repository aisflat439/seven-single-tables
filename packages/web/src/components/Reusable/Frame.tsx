import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { motion } from "framer-motion";
import { Button } from "./Button";
interface FrameProps {
  children: React.ReactNode;
}

export const Frame = ({ children }: FrameProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = React.useState(matches);

  const [session, setSession] = React.useState("");

  const getSession = async () => {
    const token = localStorage.getItem("seven-single-tables-session-token");
    if (token) {
      setSession(token);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("seven-single-tables-session-token");
    setSession("");
  };

  React.useEffect(() => {
    getSession();
  }, []);

  React.useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("seven-single-tables-session-token", token);
      window.location.replace(window.location.origin);
    }
  }, []);

  const handleOpen = () => {
    setIsOpen((current) => !current);
  };

  return (
    <div>
      <header className="bg-white border-2 border-black">
        <nav>
          <div className="max-w-screen-xl m-auto">
            <ul>
              <div className="md:flex justify-between">
                <div className="flex justify-between items-center p-4">
                  <li>
                    <Link className="text-3xl" to="/">
                      Seven Single Tables
                    </Link>
                  </li>
                  {session ? (
                    <li className="ml-4">
                      <Button variant="destructive" onClick={signOut}>
                        Log out
                      </Button>
                    </li>
                  ) : (
                    <li className="ml-4">
                      <a
                        className="bg-blue-500 py-2 px-4 rounded border-2 border-black"
                        href={`${
                          import.meta.env.VITE_API_URL
                        }/auth/github/authorize`}
                      >
                        Log in
                      </a>
                    </li>
                  )}
                  <button className="md:hidden" onClick={handleOpen}>
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div
                  className={`${
                    isOpen ? "" : "hidden"
                  } md:flex justify-center items-center`}
                >
                  <motion.li
                    whileHover={{
                      backgroundColor: "#000",
                      color: "#fff",
                      scale: 1.2,
                    }}
                    className="border-l-2 border-black h-full flex justify-center items-center"
                  >
                    <Link className="md:m-4 text-lg" to="/jira">
                      Jira
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{
                      backgroundColor: "#000",
                      color: "#fff",
                      scale: 1.2,
                    }}
                    className="border-l-2 border-black h-full flex justify-center items-center"
                  >
                    <Link className="md:m-4 text-lg" to="/posts">
                      Posts
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{
                      backgroundColor: "#000",
                      color: "#fff",
                      scale: 1.2,
                    }}
                    className="border-l-2 border-black h-full flex justify-center items-center xl:border-r-2"
                  >
                    <Link className="md:m-4 text-lg" to="/orders">
                      Orders
                    </Link>
                  </motion.li>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </header>
      <main className="m-auto min-h-screen">{children}</main>
      <footer className="bg-gray-100 p-4 flex justify-between">
        <a
          href="https://twitter.com/fitzsimons_dev"
          target="__blank"
          className="text-gray-500"
        >
          Follow me on the twitter machine
        </a>
        <Link to="privacy" className="text-gray-500">
          Privacy policy
        </Link>
        <a
          href="https://github.com/aisflat439/seven-single-tables"
          target="__blank"
          className="text-gray-500"
        >
          Visit this project on Github
        </a>
      </footer>
    </div>
  );
};
