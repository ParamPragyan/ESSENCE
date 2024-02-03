/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
const AsmrButton = (props) => {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);
  const handlePlay = () => {
    setPlay((state) => {
      return !state;
    });
  };

  const soundChangeHandler = (e) => {
    audioRef.current.volume = e.target.value / 100;
  };
  useEffect(() => {
    if (play) {
      setPlay(true);
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  const style = play
    ? "text-slate-50 text-2xl border-2 w-32 h-32 flex items-center justify-center  px-2 py-2 border-bgl cursor-pointer  border  bg-bgl px-4 py-2 rounded-round "
    : "text-slate-50 text-2xl hover:border-2 hover:border-bgl  w-32 h-32 flex items-center justify-center  px-2 py-2 border-slate-50 cursor-pointer px-4 py-2 rounded-round bgs";
  return (
    <div className="w-16  rounded-round">
      <audio ref={audioRef} loop={true}>
        <source src={props.sound.src} type="audio/mpeg" />
        <p className="text-slate-50 z-30 relative text-lg">
          Your browser does not support the audio element.
        </p>
      </audio>
      <div className="flex flex-col items-center rounded-round  ">
        <div onClick={handlePlay} className={style}>
          <img
            className="h-[4rem] w-[4rem]"
            key={props.sound.id}
            src={props.sound.img}
            type="icon/png"
            alt="no img"
          />
          {/* <source className="h-[5rem] w-[5rem]" src={props.sound.img} type="image/png" alt="no img" /> */}
        </div>
        <input
          className="w-28 mt-3 accent-bgl"
          type="range"
          onChange={soundChangeHandler}
        ></input>
      </div>
    </div>
  );
};

export default AsmrButton;
