import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "./Button";

const slideUpAnimation = {
  initial: { y: "100vh" },
  animate: { y: 0, transition: { duration: 0.2 } },
  exit: { y: "100vh" },
};

interface IDrawer {
  show: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

export const Drawer = React.forwardRef<HTMLDivElement, IDrawer>(
  (props, ref) => {
    const { show, toggle, children } = props;
    return (
      <AnimatePresence>
        {show ? (
          <motion.div
            variants={slideUpAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-50 top-0 left-0 h-full w-full flex oveflow-x-hidden overflow-y-auto overscroll-contain"
          >
            <div className="m-auto flex flex-col flex-1 mx-8 sm:mx-24 mt-16 sm:mt-96">
              <div className="flex-1">{""}</div>
              <div
                className="bg-white flex-2 mt-auto p-8 border-2 border-black rounded overscroll-contain max-w-7xl m-auto pb-52 sm:pb-96"
                ref={ref}
              >
                <div className="text-right">
                  <Button variant="brick" onClick={toggle}>
                    Close
                  </Button>
                </div>
                <div className="m-auto prose">{children}</div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  }
);
