import { motion } from "framer-motion";

type Variants =
  | "brick"
  | "destructive"
  | "informational"
  | "primary"
  | "secondary"
  | "selection";

interface IButton {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: Variants;
  onClick?: () => void;
}

const variantStyles = {
  selection:
    "px-2 py-1 bg-green-600 border-black border-2 border text-white text-xs",
  primary:
    "px-8 py-2 bg-green-600 border-black border-2 rounded-3xl text-white",
  secondary:
    "px-8 py-2 bg-pink-600 border-black border-2 rounded-3xl text-white",
  destructive:
    "px-4 py-1 bg-red-500 border-black border rounded-3xl text-black text-xs",
  brick: "px-4 py-1 bg-pink-600 border-black border-2 border text-white",
  informational:
    "px-4 py-1 bg-indigo-600 border-black border-2 border text-white",
};

export const Button = ({
  children,
  className,
  disabled = false,
  type,
  variant = "primary",
  onClick,
}: IButton) => {
  const classes = `${variantStyles[variant]} ${className} ${
    disabled && " opacity-50"
  }`;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      className={classes}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
