import { AnimatePresence, motion } from "framer-motion";
import { ICONS } from "../../constants";
import { RouterOutputs } from "../../trpc";
import { Button } from "../Reusable/Button";

export const RedditorListItem = ({
  handleSelect,
  isChecked = false,
  redditor,
}: {
  index: number;
  isChecked: boolean;
  handleSelect: (id: string) => void;
  redditor: RouterOutputs["listRedditors"]["data"][number];
}) => {
  return (
    <motion.div
      layout
      className="bg-white rounded shadow-lg p-4 border-2 border-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex-shrink-0">{ICONS[redditor.redditorId]}</div>
          <div className="ml-4 flex items-center">
            <div className="text-sm font-medium text-gray-900">
              {redditor.name}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 w-5">
            <AnimatePresence initial={false}>
              {isChecked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3.5}
                  stroke="currentColor"
                  className="text-green-500 h-10 w-10 -translate-y-4 -translate-x-2"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{
                      type: "tween",
                      duration: 0.3,
                      ease: isChecked ? "easeOut" : "easeIn",
                    }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </AnimatePresence>
          </div>
          <Button
            className="ml-3"
            variant="selection"
            disabled={isChecked}
            onClick={() => handleSelect(redditor.redditorId)}
          >
            Select
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
