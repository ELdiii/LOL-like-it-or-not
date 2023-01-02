import { useState, useEffect } from "react";
import getChampions from "../api/getChampions";
import Champ from "./Champ";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import SidePanel from "./SidePanel";

let champList = [];

export default function App() {
  //initialize state
  const [index, setIndex] = useState();
  const [likeList, setLikeList] = useState([]);
  const [dislikeList, setDislikeList] = useState([]);

  
  useEffect(() => {
    const startGame = async () => {
      await dataRequest();
      champList.sort(() => Math.random() - 0.5);
      setIndex(1);
    };
    setLikeList(JSON.parse(localStorage.getItem("likeList") ?? "[]"));
    setDislikeList(JSON.parse(localStorage.getItem("dislikeList") ?? "[]"));
    startGame();
  }, []);

  useEffect(() => {
    localStorage.setItem("likeList", JSON.stringify(likeList));
  }, [likeList]);

  useEffect(() => {
    localStorage.setItem("dislikeList", JSON.stringify(dislikeList));
  }, [dislikeList]);

  const iconVariants = {
    click: {
      scale: 0.6,
      transition: { duration: 0.08 },
    },
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen pt-10 bg-gray-800">
        <div className="flex items-center gap-10">
          <SidePanel
            champArray={likeList.slice(0, 10).reverse()}
            position="left"
          />
          <motion.button
            whileTap="click"
            className="bg-green-500 py-5 px-5 rounded-full will-change-transform"
            onClick={() => {
              setLikeList((prevState) => {
                if (prevState.includes(champList[index])) {
                  return
                }
                return [champList[index], ...prevState];
              });
              setIndex((prevState) => prevState + 1);
            }}
          >
            <motion.div variants={iconVariants}>
              <BsCheckLg />
            </motion.div>
          </motion.button>

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
            whileTap="click"
            className="bg-red-600 py-5 px-5 rounded-full will-change-transform"
            onClick={() => {
              setDislikeList((prevState) => {
                return [champList[index], ...prevState];
              });
              setIndex((prevState) => prevState + 1);
            }}
          >
            <motion.div variants={iconVariants}>
              <BsXLg />
            </motion.div>
          </motion.button>
          <SidePanel
            champArray={dislikeList.slice(0, 10).reverse()}
            position="right"
          />
        </div>
        <motion.button
          className="bg-slate-700  px-4 py-0.5 rounded-md text-white border-solid border-2 border-white will-change-transform"
          whileHover={{ scale: 0.95 }}
          onClick={() => {
            localStorage.setItem("likeList", "");
            localStorage.setItem("dislikeList", "");
            setLikeList([]);
            setDislikeList([]);
          }}
        >
          Reset Game
        </motion.button>
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
