import React from "react";

type Colors = "green" | "blue" | "yellow" | "orange";
interface ICard {
  color: Colors;
  link: string;
  linkText: string;
  subtitle: string;
  title: string;
}

export const Card: React.FunctionComponent<ICard> = ({
  color,
  link,
  linkText,
  subtitle,
  title,
}) => {
  const colorStyles = {
    green: "bg-green-400",
    blue: "bg-blue-400",
    yellow: "bg-yellow-400",
    orange: "bg-orange-400",
  };
  return (
    <li className="bg-white rounded">
      <div className={`${colorStyles[color]} p-8 rounded`}>
        <h3 className="text-6xl">{title}</h3>
        <p>{subtitle}</p>
      </div>
      <div className="p-8 text-right">
        <a
          className="underline text-blue-400 text-2xl"
          target="__blank"
          href={link}
        >
          {linkText}
        </a>
      </div>
    </li>
  );
};
