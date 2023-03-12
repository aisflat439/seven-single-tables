import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useOnClickOutside, useToggle } from "usehooks-ts";
import useKeypress from "../hooks/useKeypress";
import { Drawer } from "../components/Drawer";
import { PageHeading } from "../components/PageHeading";
import { usePosts } from "../hooks/usePosts";

export function Posts() {
  const { posts } = usePosts();
  const [show, toggle, setShow] = useToggle(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    document.body.classList.toggle("overflow-hidden", show);
  }, [show]);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);
  useKeypress("Escape", handleClickOutside);

  return (
    <div className="bg-orange-500 p-2 min-h-screen">
      <div className="max-w-7xl m-auto">
        <PageHeading
          title="Posts"
          accessPattern={[
            "Create a post",
            "Comment on the post",
            "List Comments",
            "List Posts",
          ]}
          show={show}
          toggle={toggle}
        />
        <div className=""></div>
        <motion.div
          layout
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 "
        ></motion.div>
      </div>
      <Drawer show={show} toggle={toggle} ref={ref}>
        <p>tbd.</p>
      </Drawer>
    </div>
  );
}
