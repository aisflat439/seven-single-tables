import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

interface FrameProps {
  children: React.ReactNode;
}

export const Frame = ({ children }: FrameProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = React.useState(matches);

  const handleOpen = () => {
    setIsOpen((current) => !current);
  };

  return (
    <div>
      <header className="bg-slate-300">
        <nav>
          <div className="max-w-screen-xl m-auto p-4">
            <ul>
              <div className="md:flex justify-between">
                <div className="flex justify-between">
                  <li>
                    <Link className="text-xl" to="/">
                      Seven Single Tables
                    </Link>
                  </li>
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
                <div className={`${isOpen ? "" : "hidden"} md:flex`}>
                  <li>
                    <Link className="md:ml-4 text-lg" to="/jira">
                      Jira
                    </Link>
                  </li>
                  <li>
                    <Link className="md:ml-4 text-lg" to="/posts">
                      Posts
                    </Link>
                  </li>
                  <li>
                    <Link className="md:ml-4 text-lg" to="/orders">
                      Orders
                    </Link>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </header>
      <main className="max-w-screen-xl m-auto py-4 px-8">{children}</main>
      <footer className="bg-gray-100 p-4 flex justify-between">
        <a
          href="https://twitter.com/fitzsimons_dev"
          target="__blank"
          className="text-gray-500"
        >
          Follow me on the twitter machine
        </a>
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
