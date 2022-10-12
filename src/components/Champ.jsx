import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const Champ = ({ selectedChamp: { name, img } }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-80 h-[582px] bg-gradient-to-br from-teal-500 to-slate-500 flex items-center justify-center">
        <FaSpinner className="absolute fill-white animate-spin text-5xl" />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ scale: [0.9, 1.05, 1], opacity: 1 }}
          transition={{ delay: 0.4 }}
          src={
            img !== undefined
              ? `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${img}.jpg`
              : ""
          }
          alt={name}
          className="absolute w-80"
        />
      </div>
      <div className="text-center text-white text-3xl flex-wrap h-24 w-64">
        {name}
      </div>
    </div>
  );
};

export default Champ;
