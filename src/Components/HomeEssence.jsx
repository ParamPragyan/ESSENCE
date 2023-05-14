import React from "react";
import { Link, NavLink } from "react-router-dom";
import leftImg from "../../public/left-img.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/all";
import {BsGithub} from "react-icons/bs"
import {BsLinkedin} from "react-icons/bs"
import {BsTwitter} from "react-icons/bs"
import logo from "../../public/logo2.png"



const HomeEssence = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-around w-full bg-[#021420] home">
      <div className="bar flex  items-center justify-between pt-[0rem] mx-[12rem]">
        <div className="bar flex  items-center justify-center ">
          <img
            className="w-[2.5rem] h-[2.5rem]"
            src={logo}
            alt=""
          />
          <h1 className="logo-txt text-[#156669] font-[Righteous]  text-[2rem]">
            SSENCE
          </h1>
        </div>
        <div className="login-bar flex">
          <h1 className=" text-[#156669] font-[Righteous]  text-[2rem]" >Login</h1>
          <h1 className="border-l-[2px] pl-[2rem] ml-[2rem] border-[white] text-[#156669] font-[Righteous]  text-[2rem]" >Signup</h1>
        </div>
      </div>
      <div className="hero-content flex justify-between mx-[12rem]">
        <div className="left mt-[0rem]">
          <div className="upper-txt text-[#7cbebf] font-[Montserrat]  font-[800] text-[4rem] leading-[4.5rem]">
            <h1 className="w-[45rem] upt">
              Say goodbye to neck and back pain with{" "}
            </h1>
          </div>
          <div className="main-txt">
            <h1 className="m-txt h-[18vh] text-[#ffffff] font-[Noto+Sans] ml-[-.5rem] font-[900] text-[12rem] leading-[12rem] ">
              ESSENCE's{" "}
            </h1>
            <div className="main-side-txt border-[#ffffff] w-[25rem] h-[4.3rem] border-b-[.1rem] border-r-[.1rem] ml-[37rem]">
              <h1 className="pl-[7rem] text-[#7cbebf] font-[Noto+Sans] font-bold text-[2rem]">
                posture alerts."
              </h1>
            </div>
          </div>
          <div className="lower-txt">
            <ul className=" text-[#c9c9c9] gap-[20rem] font-[Noto+Sans] font-[700] text-[2.5rem] p-3 mt-[2rem]">
              <li className="flex items-center gap-3 leading-[3rem] ">
                <IoMdCheckmarkCircleOutline className="h-[2rem] w-[2rem]" />{" "}
                <h1 className="tracking-[.12rem]">
                  Address poor posture while using digital devices.
                </h1>
              </li>
              <li className="flex items-center gap-3 leading-[3rem]">
                <IoMdCheckmarkCircleOutline className="h-[2rem] w-[2rem]" />
                <h1 className="tracking-[.12rem] subpixel-antialiased">
                  Avoid major issues like "sleep apnea" and "slip disc" from
                  arising.
                </h1>
              </li>
              <li className="flex items-center gap-3 leading-[3rem]">
                <IoMdCheckmarkCircleOutline className="h-[2rem] w-[2rem]" />
                <h1 className="tracking-[.12rem]">
                  Improve productivity and sleep cycles.
                </h1>
              </li>
            </ul>
          </div>
          <div className="nav-btn-container   mt-[3.5rem]  ">
            <button className="navbtn ">
              <NavLink
                className="nav-link flex items-center relative overflow-hidden text-[#fff] font-[Montserrat] font-[600] rounded-[20rem] text-[2rem] p-[2rem] pr-[7rem]"
                to="/dashboard"
              >
                Get Started
                <div class="icon-btn py-[2rem] w-[4.1rem]  rounded-[50%] mr-[1rem]  bg-[#a1dacd] absolute flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    ></path>
                  </svg>
                </div>
              </NavLink>
            </button>
          </div>
        </div>
        <div className="right flex flex-col">
          <div className="img-container w-[55rem] h-[50rem]">
            <div className="left-img w-[43rem] h-[43rem] flex items-center justify-center rounded-[56% 44% 28% 72% / 38% 33% 67% 62%] bg-[#ffffff]">
              <img className="p-[3rem]" src={leftImg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="icon-container flex items-center justify-between mx-[12rem]">
        
        <ul className="icons flex gap-10 ml-[1rem] items-center justify-center">
          <li>
            {" "}
            <a href="">
            <BsLinkedin className=" icon w-[2.8rem] h-[2.8rem] text-[#97c0bc]"/>
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="">
              <BsGithub className="icon w-[3rem] h-[3rem] text-[#97c0bc]"/>
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="">
            <BsTwitter className="icon w-[3rem] h-[3rem] text-[#97c0bc]"/>
            </a>{" "}
          </li>
        </ul>
        <div><h1 className="text-[1.8rem] font-[Noto+Sans] font-[500] px-[1rem] py-[.2rem] tag">Made with⚡by Cube.</h1></div>
      </div>
    </div>
  );
};

export default HomeEssence;
