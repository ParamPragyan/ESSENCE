import React from "react";

import moment from "moment";

import TenserFlowHandler from "./Tensorflow/TensorflowHandler";

import { useState, useRef } from "react";

const DashboardEssence = () => {
  const [time, setTime] = useState(0);
  const [flag, setFlag] = useState(false);
  const hourInputRef = useRef(0);
  const minuteInputRef = useRef(0);
  const submitHandler = (e) => {
    e.preventDefault();

    setFlag((state) => {
      return !state;
    });

    setTime(
      moment()
        .add(hourInputRef.current.value, "hours")
        .add(minuteInputRef.current.value, "minutes")
    );
  };
  return (
    <div>
      <div className="container1 flex items-center justify-center  h-[100vh] text-[#ffffff] bg-[#021420]">
        <div className="wrapper rounded-t-[5rem] h-[40rem] w-[40rem] bg-[#252525] flex items-center justify-center flex-col">
          <div className="button-outer ">
            <form onSubmit={submitHandler} className="buttons flex items-center justify-center flex-col gap-[4rem]">
              {!flag && (
                <div className="inputContainer flex ">
                  <div className="hours">
                    <input className="input w-[10rem] text-center rounded-[1rem] text-[3rem] text-[#ffffff]"
                    placeholder="Hrs"
                      ref={hourInputRef}
                      type="text"
                      min={0}
                      max={24}
                    ></input>
                  
                  </div>
                  <pre className ="text-[3rem]" >:</pre>
                  <div className="minutes">
                    <input className="input w-[10rem] text-center rounded-[1rem] text-[3rem] text-[#ffffff]"
                     placeholder="Min"
                      ref={minuteInputRef}
                      type="text"
                      min={0}
                      max={60}
                    ></input>

                  </div>
                </div>
              )}
              <button
                
                className="start btn1  rounded-[1rem] w-[21rem] p-[1rem] text-[#fff] text-[2rem] "
              >
                {flag ? "Reset" : "Start"}
              </button>
            </form>
          </div>
          <div >
            {flag && (
              <TenserFlowHandler className =""
                hour={hourInputRef.current.value}
                minutes={minuteInputRef.current.value}
                time={time}
                submitHandler={submitHandler}
                flag={flag}
              ></TenserFlowHandler>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEssence;
