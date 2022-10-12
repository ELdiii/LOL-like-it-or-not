import { AnimatePresence, motion } from "framer-motion";

export default function SidePanel({ champArray, position }) {
  return (
    <>
      <motion.div className="w-80">
        <AnimatePresence mode="popLayout">
          {champArray.map((champ) => (
            <motion.div
              layout
              key={champ.name}
              initial={{ x: position === "left" ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
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
