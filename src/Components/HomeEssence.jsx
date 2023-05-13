import React from "react";
import { Link, NavLink } from "react-router-dom";
import leftImg from "../../public/left-img.png"
import github from "../../public/github.svg"
import linkedin from "../../public/linkedin.svg"
import twitter from "../../public/twitter.svg"

const HomeEssence = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-around w-full bg-gradient-to-r from-[#baffdf] to-[#f6fffc]">
      <div className="logo flex flex-col items-center justify-center pt-[0rem]">
        <img className="w-[2.5rem] h-[2.5rem]" src="../../public/logo.png" alt="" />
        <h1 className="logo-txt text-[#156669] font-[roca] font-bold text-[2rem]">
          ESSENCE
        </h1>
      </div>
      <div className="hero-content flex justify-around mx-[13rem]">
        <div className="left mt-[0rem]">
          <div className="upper-txt text-[#156669] font-[roca-bold] text-[4rem] leading-[4.5rem]">
            <h1 className="w-[45rem]">
              Say goodbye to neck and back pain with{" "}
            </h1>
          </div>
          <div className="main-txt">
            <h1 className=" h-[22vh] text-[#156669] font-[lovelo] text-[14rem] leading-[18rem] ">
              ESSENCE's{" "}
            </h1>
            <div className="main-side-txt border-[#156669] w-[25rem] h-[5rem] border-b-[.5rem] border-r-[.5rem] ml-[40rem]">
              <h1 className="pl-[7rem] text-[#156669] font-[roca-bold] text-[2.2rem]">
                posture alerts."
              </h1>
            </div>
          </div>
          <div className="lower-txt">
            <p className=" text-[#156669] font-[roca] text-[2rem] w-[50rem] mt-[2rem]">
              ESSENCE is a health app designed to help you maintain good posture
              while working on your computer or laptop. With the prolonged use
              of digital devices, poor posture has become a common issue that
              leads to various health problems like neck and back pain,
              headaches, and even poor digestion."
            </p>
          </div>
        </div>
        <div className="right flex flex-col">
          <div className="left-img w-[50rem]">
            <img src={leftImg} alt="" />
          </div>
          <div className="nav-btn-container h-[fit-contained] py-[6rem] px-[2rem] rounded-[20rem]  mt-[1.5rem] ml-[8rem]  ">
            <button className="navbtn ">
              <NavLink
                className="nav-link bg-[#156669] h-[] text-[#fff] font-[roca-bold] rounded-[20rem] text-[3rem] p-[4rem] px-[8rem]"
                to="/dashboard"
              >
                Get Started
              </NavLink>
            </button>
          </div>
        </div>
      </div>
      <div className="icon-container m">
        <ul className="icons flex items-center justify-center">
          <li>
            {" "}
            <a href="">
              <img src={linkedin} alt="" />
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="">
              <img src={github} alt="" />
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="">
              <img src={twitter} alt="" />
            </a>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeEssence;
