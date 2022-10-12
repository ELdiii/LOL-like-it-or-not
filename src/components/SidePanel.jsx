import { AnimatePresence, motion } from "framer-motion";

export default function SidePanel({ champArray }) {
  return (
    <>
      <motion.div className="w-80 ">
        <AnimatePresence mode="popLayout">
          {champArray.map((champ) => (
            <motion.div
              layout
              key={champ.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className=" text-white text-xl bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent "
            >
              {champ.name}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
