import { motion } from "framer-motion";

import { PageDetails } from "../components/Reusable/PageDetails";

export function Orders() {
  return (
    <div className="bg-purple-600 p-2 min-h-screen">
      <div className="max-w-7xl m-auto">
        <PageDetails title="Orders" accessPattern={["View Orders"]}>
          <p>
            Here's where I'll talk about what Orders is all about. I don't know
            what I'll say because I haven't written it yet. This is just
            placeholder text
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quibusdam distinctio unde sint quam optio dicta veniam molestiae
            nihil? Non temporibus pariatur quod eaque? Adipisci possimus quas
            laborum soluta quis.
          </p>
        </PageDetails>
        <motion.div
          layout
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 "
        ></motion.div>
      </div>
    </div>
  );
}
