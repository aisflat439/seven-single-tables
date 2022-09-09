import React from "react";

interface ICard {
  children: React.ReactNode;
  isOpen: boolean;
}

interface IFooter {
  toggle: () => void;
  children: React.ReactNode;
}

const Footer = ({ children, toggle }: IFooter) => {
  return (
    <>
      <div className="flex justify-end">
        <button className="text-sm text-blue-500 underline" onClick={toggle}>
          {children}
        </button>
      </div>
    </>
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
