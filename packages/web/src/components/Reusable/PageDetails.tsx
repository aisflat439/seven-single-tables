import React from "react";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import useKeypress from "../../hooks/useKeypress";
import { Button } from "./Button";
import { Drawer } from "./Drawer";

export const PageDetails = ({
  accessPattern,
  children,
  subtitle,
  title,
}: {
  accessPattern: string[];
  children: React.ReactNode;
  subtitle?: string;
  title: string;
}) => {
  const [show, toggle, setShow] = useToggle(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    document.body.classList.toggle("overflow-hidden", show);
  }, [show]);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);
  useKeypress("Escape", handleClickOutside);

  return (
    <>
      <article className="bg-white border-2 border-black rounded my-8">
        <div className="flex justify-between p-4">
          <h1 className="flex items-center text-4xl">
            {title}{" "}
            {Boolean(subtitle) && (
              <span className="ml-2 text-2xl text-gray-700">({subtitle})</span>
            )}
          </h1>
          <Button
            disabled={show}
            onClick={toggle}
            variant="informational"
            className="text-sm"
          >
            What's happening?
          </Button>
        </div>
        <p className="m-4">
          Implement a table with the following access patterns:
        </p>
        <ul className="pl-6 m-4">
          {accessPattern.map((pattern) => (
            <li key={pattern}>{pattern}</li>
          ))}
        </ul>
      </article>
      <Drawer show={show} toggle={toggle} ref={ref}>
        {children}
      </Drawer>
    </>
  );
};
