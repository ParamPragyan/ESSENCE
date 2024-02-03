import wind from "../../assets/Sounds/wind-white-noise.mp3";
import underWater from "../../assets/Sounds/underwater-white-noise.mp3";
import forest from "../../assets/Sounds/forest-white-noise.mp3";
import keyboard from "../../assets/Sounds/keyboard-white-noise.mp3";
import fireWhite from "../../assets/Sounds/fire-white-noise.mp3";
import publicPlace from "../../assets/Sounds/public-place-white-noise.mp3";
import windIcon from "../../assets/Icons/wind.png";
import arrowIcon from "../../assets/Icons/arrow.png";
import waterIcon from "../../assets/Icons/water.png";
import forestIcon from "../../assets/Icons/forest.png";
import keyboardIcon from "../../assets/Icons/keyboard.png";
import fireIcon from "../../assets/Icons/fire.png";
import cityIcon from "../../assets/Icons/city.png";

import AsmrButton from "./AsmrButton";
import { useState } from "react";

const sounds = [
  { id: "01", img: windIcon, src: wind },
  { id: "02", img: waterIcon, src: underWater },
  { id: "03", img: forestIcon, src: forest },
  { id: "04", img: keyboardIcon, src: keyboard },
  { id: "05", img: fireIcon, src: fireWhite },
  { id: "06", img: cityIcon, src: publicPlace },
];
const AsmrPanel = () => {
  const [expand, setExpand] = useState(false);

  const expandHandler = () => {
    setExpand((state) => {
      return !state;
    });
  };
  const panelWidth = expand ? "w-fit" : "w-[11rem]";
  return (
    <div className="  h-1/2 w-fit bgs2  absolute top-1/2 rounded-l-[2rem]   border-bgl border-l -translate-y-1/2 right-0 ">
      <div className="relative w-fit h-full ">
        <span
          className="text-slate-50 text-2xl absolute z-10 top-1/2  -translate-y-1/2 -translate-x-full cursor-pointer "
          onClick={expandHandler}
        >  
        <div className="bg-[#021420] p-2 rounded-l-full  border-bgl border-y border-l z-30 ">
        <img className="h-[1.5rem] w-[2.5rem]" src={arrowIcon} alt="" />
        </div>
          
        </span>
        <div
          className={`relative transition-transform duration-500 ease-in-out rounded-l-[2rem] ${panelWidth} overflow-hidden  h-full bg-[#02142000] rounded-l-3xl `}
        >
          <div className="flex flex-col  w-96 h-full rounded-round gap-4 flex-wrap items-center justify-center">
            {sounds.map((sound, index) => {
              return <AsmrButton key={index} sound={sound}></AsmrButton>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsmrPanel;
