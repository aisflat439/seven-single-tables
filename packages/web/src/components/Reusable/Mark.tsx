type Colors =
  | "orange"
  | "purple"
  | "blue"
  | "green"
  | "yellow"
  | "pink"
  | "indigo";

export const Mark = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: Colors;
}) => {
  const colorStyles = {
    orange: "bg-orange-100 p-1",
    purple: "bg-purple-100 p-1",
    blue: "bg-blue-100 p-1",
    green: "bg-green-200 p-1",
    yellow: "bg-yellow-100 p-1",
    pink: "bg-pink-100 p-1",
    indigo: "bg-indigo-100 p-1",
  };
  return <span className={colorStyles[color]}>{children}</span>;
};
