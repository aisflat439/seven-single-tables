import React from "react";
import { useBoolean } from "usehooks-ts";

interface ICard {
  children: React.ReactNode;
}

interface IFooter {
  children: React.ReactNode;
}

const Footer = ({ children }: IFooter) => {
  const { value: isOpen, toggle } = useBoolean(false);
  return (
    <div className="flex justify-end">
      <button className="text-sm text-blue-500 underline" onClick={toggle}>
        {children}
      </button>
    </div>
  );
};

export const Card: React.FunctionComponent<ICard> & {
  Footer: typeof Footer;
} = function Card({ children }) {
  return (
    <div className="border p-4 flex flex-col justify-between">{children}</div>
  );
};

Card.Footer = Footer;
