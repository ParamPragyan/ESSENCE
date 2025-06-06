/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import Timer from "../Timer/Timer";
import AccessStart from "../UI/AccessStart";
import AccessButtons from "../UI/AccessButtons";
import noVideo from "../../assets/Icons/no-camera.png";
import showVideo from "../../assets/Icons/camera.png";
import DropDownMenu from "../UI/DropDownMenu";
import StartIcon from "../../assets/Icons/start.png";
import ResetIcon from "../../assets/Icons/reset.png";
import ResumeIcon from "../../assets/Icons/resume.png";
import PauseIcon from "../../assets/Icons/pause.png";
import { updateTimeSpent } from "../../helper/helper";
import { authCtx } from "../../store/auth-context";
import toast from "react-hot-toast";
import { min } from "@tensorflow/tfjs";
const Input = () => {
  const hoursRef = useRef(0);
  const minutesRef = useRef(0);
  const hours = useRef(0);
  const minutes = useRef(0);

  const [timerVisibility, setTimerVisibility] = useState(false);
  const [camra, setCamra] = useState(true);
  const [pause, setPause] = useState(false);
  const authContext = useContext(authCtx);

  const pauseHandler = () => {
    setPause((state) => {
      return !state;
    });
  };

  const [showMenu, setShowMenu] = useState(false);
  const menuHandler = () => {
    setShowMenu((state) => {
      return !state;
    });
  };
  const startTimer = () => {
    setTimerVisibility(true);
  };

  const endTimer = () => {
    return new Promise((res) => {
      setPause(false);
      setTimerVisibility(() => {
        res();
        return false;
      });
    });
  };
  const camraHandler = () => {
    setCamra((state) => {
      return !state;
    });
  };
  const timerPromise = () => {
    return new Promise((res) => {
      setTimerVisibility(() => {
        res();
        return false;
      });
    });
  };
  const cancelHandler = async () => {
    try {
      await timerPromise();
      const storageData = JSON.parse(localStorage.getItem("essence"));

      if (storageData?.timeSpent && authContext.userInfo.isLoggedIn) {
        //updating user time from the last login
        await updateTimeSpent(
          authContext.userInfo.userId,
          storageData.timeSpent,
          storageData.notified,
          storageData.date
        );
        localStorage.setItem(
          "essence",
          JSON.stringify({
            ...storageData,
            timeSpent: 0,
            notified: 0,
          })
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const startButtonHandler = () => {
    hours.current = hoursRef.current.value ? +hoursRef.current.value : 0;
    minutes.current = minutesRef.current.value ? +minutesRef.current.value : 0;
    console.log(hours.current, minutes.current);
    if (hours.current > 24) {
      toast.error("Please enter the hours less than or equal to 24 hours", {
        className: "text-5xl",
      });
      return;
    } else if (minutes.current >= 60) {
      toast.error("Please enter the valid minutes", {
        className: "text-5xl",
      });
      return;
    } else if (!minutes.current && !hours.current) {
      toast.error("Please enter some values", {
        className: "text-5xl",
      });
      return;
    }
    endTimer().then(() => {
      startTimer();
    });
  };

  const timeChangeHandler = (selectedTime) => {
    const time = selectedTime;

    if (+time >= 60) {
      hoursRef.current.value =
        Math.floor(+time / 60) < 10
          ? "0" + Math.floor(+time / 60)
          : Math.floor(+time / 60);
      minutesRef.current.value =
        +time % 60 < 10 ? "0" + (+time % 60) : +time % 60;
    } else {
      hoursRef.current.value = "00";
      minutesRef.current.value = +time < 10 ? "0" + +time : +time;
    }
  };
  useEffect(() => {
    hoursRef.current.value = "00";
    minutesRef.current.value = 10;
  }, []);
  return (
    <div className="flex flex-col ">
      <div className="flex">
        <div className="form_container relative">
          {!timerVisibility && (
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={submitHandler}
            >
              <div className="time_container flex  justify-center items-center  bg-[#00000093] w-x h-[40vh] rounded-3xl z-10 ">
                <div className="flex gap-3">
                  <input
                    ref={hoursRef}
                    className="text-9xl bg-transparent outline-bgl  outline-4 text-white font-la text-center rounded-lg w-40 focus:outline"
                    placeholder="00"
                  ></input>
                  <pre className="text-[8rem] text-bgl">:</pre>
                  <input
                    ref={minutesRef}
                    className="text-9xl bg-transparent outline-bgl  outline-4 text-white font-la text-center rounded-lg w-40 focus:outline"
                    placeholder="00"
                  ></input>
                </div>
              </div>
              <div className="flex items-center justify-center">
                {/* <Button text="Start"></Button> */}

                {/* <div
                onClick={camraHandler}
                className="text-slate-50 text-4xl border border-bgl bg-bgl px-4 py-2 rounded-lg"
              >
                <img className={`h-16`} src={camra ? showVideo : noVideo}></img>
              </div> */}
              </div>
            </form>
          )}
          {!timerVisibility && (
            <div>
              <div className="absolute top-8 right-10 z-20">
                <button
                  onClick={menuHandler}
                  className="text-3xl border-l-4 border-b-4 border-bgl  bg-white px-3 py-3 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="34"
                    width="34"
                  >
                    <title>timer-edit</title>
                    <path d="M15 3H9V1H15V3M19.39 10.74L11 19.13V21.94C6.5 21.44 3 17.63 3 13C3 8.03 7.03 4 12 4C14.12 4 16.07 4.74 17.62 6L19.04 4.56C19.55 5 20 5.46 20.45 5.97L19.03 7.39C19.67 8.19 20.17 9.11 20.5 10.1C20.1 10.21 19.71 10.42 19.39 10.74M13 7H11V14H13V7M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z" />
                  </svg>
                </button>
                {showMenu && (
                  <DropDownMenu
                    timeChangeHandler={timeChangeHandler}
                    menuHandler={menuHandler}
                  ></DropDownMenu>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {!timerVisibility && showMenu && (
        <div
          className="absolute w-full h-full top-0 left-0 z-10  "
          onClick={menuHandler}
        ></div>
      )}
      {/* timer */}
      {timerVisibility && (
        <Timer
          hour={hours.current}
          minute={minutes.current}
          camra={camra}
          pause={pause}
          cancelHandler={cancelHandler}
        ></Timer>
      )}

      {/* Access Buttons */}

      <div className="flex mt-8">
        {!timerVisibility && (
          <div className="w-full flex items-center justify-center">
            <AccessStart onClick={startButtonHandler}>
              <img className="p-3" src={StartIcon} alt="" />
            </AccessStart>
          </div>
        )}

        {timerVisibility && (
          <div className="w-full flex items-center justify-center">
            <AccessButtons onClick={pauseHandler}>
              <img
                className="p-3"
                src={pause ? ResumeIcon : PauseIcon}
                alt=""
              />
            </AccessButtons>
          </div>
        )}

        {timerVisibility && (
          <div className="w-full flex items-center justify-center">
            <AccessButtons
              className="mt-5"
              text="Reset"
              onClick={cancelHandler}
            >
              <img className="p-3" src={ResetIcon} alt="" />
            </AccessButtons>
          </div>
        )}

        <div className="w-full flex items-center justify-center">
          <AccessButtons onClick={camraHandler} className="">
            <img className="p-3" src={camra ? showVideo : noVideo}></img>
          </AccessButtons>
        </div>
      </div>
    </div>
  );
};

export default Input;
