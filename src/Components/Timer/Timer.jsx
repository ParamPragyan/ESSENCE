/* eslint-disable react/prop-types */
import { useEffect, useReducer, useRef } from "react";
import { MemorizedTensorFLow } from "../TensorFlow/TensorFlow";
import { formatDate } from "../../helper/helper.js";

const timeReducer = (state, action) => {
  if (action.type === "changed") {
    return {
      hours: Math.floor((state.totalTime - 1) / (60 * 60)),
      minutes: Math.floor((state.totalTime - 1) / 60) % 60,
      seconds: (state.totalTime - 1) % 60,
      totalTime: state.totalTime - 1,
    };
  }
};

const Timer = ({ hour, minute, camra, pause, cancelHandler }) => {
  const [time, dispatch] = useReducer(timeReducer, {
    hours: +hour,
    minutes: +minute,
    seconds: 0,
    totalTime: hour * 60 * 60 + minute * 60,
  });
  /** to get the totalTimeSpent on the page */
  const timeSpent = useRef(0);
  const interval = useRef(null);
  // const [pause, setPause] = useState(false);

  const totalTimeRef = useRef(hour * 60 * 60 + minute * 60);
  const counter = () => {
    dispatch({
      type: "changed",
    });
  };

  useEffect(() => {
    if (!pause) {
      interval.current = setInterval(() => {
        totalTimeRef.current = totalTimeRef.current - 1;
        timeSpent.current++;
        const todayDate = formatDate();
        /* to check if the essence is not present in the local storage */
        if (!localStorage.getItem("essence")) {
          localStorage.setItem(
            "essence",
            JSON.stringify({
              authId: "fafasdf",
              date: "2023-09-04T19:56:34.711Z",
              timeSpent: timeSpent.current,
            })
          );
          /*  */
        } else if (timeSpent.current % 20 === 0) {
          const storageData = localStorage.getItem("essence");
          const parseStorageData = JSON.parse(storageData);
          const parsedDate = new Date(parseStorageData.date);

          if (todayDate !== parsedDate) {
            localStorage.setItem(
              "essence",
              JSON.stringify({
                ...parseStorageData,
                date: todayDate,
                timeSpent: 0,
              })
            );
          }
          localStorage.setItem(
            "essence",
            JSON.stringify({
              ...parseStorageData,
              date: todayDate,
              timeSpent: parseStorageData.timeSpent + 20,
            })
          );
        }
        if (totalTimeRef.current === 0) {
          clearInterval(interval);
          cancelHandler();
        }
        counter();
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [pause]);
  return (
    <div className="text-slate-50 flex items-center flex-col justify-center bg-[#00000093] w-x h-x rounded-round time_container">
      <div className="text-xxl font-la flex items-center justify-center">
        <span>{time.hours < 10 ? `0${time.hours}` : `${time.hours}`}:</span>
        <span>
          {time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`}:
        </span>
        <span>
          {time.seconds < 10 ? `0${time.seconds}` : `${time.seconds}`}
        </span>
      </div>

      <div className="absolute">
        {camra && !pause && <MemorizedTensorFLow></MemorizedTensorFLow>}
      </div>
    </div>
  );
};

export default Timer;
