import { useState, useEffect } from "react";
import getChampions from "../api/getChampions";
import Champ from "./Champ";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheckLg, BsXLg } from "react-icons/bs";

let champList = [];
let smashList = [];
let passList = [];

export default function App() {
  const [index, setIndex] = useState();

  useEffect(() => {
    const startGame = async () => {
      await dataRequest();
      champList.sort(() => Math.random() - 0.5);
      setIndex(1);
    };
    startGame();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center h-screen pt-10 bg-gray-800">
        <div className="flex items-center gap-10">
          <button
            className="bg-green-500 py-5 px-5 rounded-full"
            onClick={() => {
              smashList.push(champList[index]);
              setIndex((prevState) => prevState + 1);
            }}
          >
            <BsCheckLg />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Champ selectedChamp={champList.length ? champList[index] : {}} />
            </motion.div>
          </AnimatePresence>
          <motion.button
            key={index}
            animate={{ rotate: 90 }}
            className="bg-red-600 py-5 px-5 rounded-full"
            onClick={() => {
              passList.push(champList[index]);
              setIndex((prevState) => prevState + 1);
            }}
          >
            <BsXLg />
          </motion.button>
        </div>
      </div>
    </>
  );
}

// 🐗🐗 Divoká Metóda
const dataRequest = async () => {
  const champs = (await getChampions.get("championFull.json")).data.data;

  Object.values(champs).forEach((champData) => {
    Object.values(champData.skins).forEach((skin) => {
      champList.push({
        id: skin.id,
        name: skin.name === "default" ? champData.name : skin.name,
        img: champData.id + "_" + skin.num,
      });
    });
  });
};
