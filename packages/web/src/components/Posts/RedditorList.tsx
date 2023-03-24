import { motion } from "framer-motion";
import { ICONS } from "../../constants";
import { RouterOutputs } from "../../trpc";

export const RedditorListItem = ({
  handleDeleteRedditor,
  index,
  redditor,
}: {
  index: number;
  handleDeleteRedditor: (id: string) => void;
  redditor: RouterOutputs["listRedditors"]["data"][number];
}) => {
  return (
    <motion.div
      layout
      className="bg-white rounded-lg shadow-lg p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex-shrink-0">{ICONS[index]}</div>
          <div className="ml-4 flex items-center">
            <div className="text-sm font-medium text-gray-900">
              {redditor.name}
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => handleDeleteRedditor(redditor.redditorId)}
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};
