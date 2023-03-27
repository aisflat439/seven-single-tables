type Colors = "black" | "green";

const colorStyles = {
  black: "border-black",
  green: "border-green-400",
};

export const Spinner = ({ color = "black" }: { color?: Colors }) => {
  const classes =
    `${colorStyles[color]}` +
    " inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]";
  return (
    <div className={classes} role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
