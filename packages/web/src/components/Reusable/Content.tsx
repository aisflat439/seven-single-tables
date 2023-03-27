import { AnimatePresence, motion } from "framer-motion";
import { useToggle } from "usehooks-ts";
import { ICONS } from "../../constants";
import { Button } from "./Button";

export const Content = ({
  text,
  children,
  details,
}: {
  text: string;
  children: React.ReactNode;
  details: { id: string; text: string }[];
}) => {
  const [view, toggle] = useToggle();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded shadow-lg p-4 border-2 border-black">
        <div>{children}</div>
        <div className="flex justify-end">
          <Button type="button" variant="text" onClick={toggle}>
            {view ? "Hide" : "Show"} {text}
          </Button>
        </div>
        <AnimatePresence>
          {view && (
            <motion.div
              initial="closed"
              exit="closed"
              animate="open"
              variants={{
                open: {
                  height: "auto",
                  transition: { delayChildren: 0.1 },
                },
                closed: { height: 0, transition: { delayChildren: -1 } },
              }}
            >
              {details.map((details) => (
                <motion.div
                  key={details.id}
                  className="flex items-center"
                  variants={{
                    closed: { opacity: 0 },
                    open: { opacity: 1 },
                  }}
                >
                  <span>{ICONS[details.id]}</span>
                  <p>{details.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
