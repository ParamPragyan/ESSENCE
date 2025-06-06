/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authCtx } from "../../store/auth-context";
import Button from "../UI/Button";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import leftImg from "../../assets/Icons/right-img.png";
import logo from "../../../public/logo2.png";
import classes from "./Home.module.css";
import { BsCheck2Circle } from "react-icons/bs";
import bgIcon from "../../assets/Icons/bg-icon.png";
import bgIcon2 from "../../assets/Icons/medical.png";
import CopyRight from "../Footer/CopyRight";

const Home = ({ showAuthHandler, register, setRegister }) => {
  const authContext = useContext(authCtx);
  console.log(authContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    authContext.logout();
  };

  const redirectToDashboardHandler = () => {
    if (authContext.userInfo.isLoggedIn) {
      navigate("/dashboard");
    }
    showAuthHandler();
    setRegister(false);
  };
  return (
    <div className="h-[100vh] relative overflow-hidden flex flex-col justify-around max-md:justify-between w-full bg-bgd home">
      <div className="bar flex max-md:mt-10 items-center justify-between max-lg:mx-20 max-md:mx-10 mx-48">
        <div className="bar flex  items-center justify-center ">
          <img className="w-10 h-10" src={logo} alt="" />
          <h1 className="logo-txt text-bgl font-[Righteous]  text-b1">
            SSENCE
          </h1>
        </div>
        <div className="login-bar flex">
          {authContext.userInfo.isLoggedIn ? (
            <Button
              onClick={logoutHandler}
              className="text-[#156669] font-[Righteous] cursor-pointer  text-b1"
              text={"Logout"}
            ></Button>
          ) : (
            <div>
              <button
                onClick={() => {
                  showAuthHandler();
                  setRegister(false);
                }}
                className=" text-bgl max-lg:hidden font-[Righteous] cursor-pointer  text-b1"
              >
                Login
              </button>
              <button
                onClick={showAuthHandler}
                className="border-l-2 pl-8 ml-8 cursor-pointer max-lg:border-none border-slate-50 text-bgl font-[Righteous]  text-b1"
              >
                SignUp
              </button>
            </div>
          )}
        </div>
      </div>

      {/* <div className="logo flex flex-col items-center justify-center pt-[0rem]">
        <img className="w-[2.5rem] h-[2.5rem]" src={logo} alt="" />
        <h1 className="logo-txt text-[#156669] font-[Righteous]  text-[2rem]">
          ESSENCE
        </h1>
      </div> */}
      {/* <div>
        <Button text="SignUp" onClick={showAuthHandler}></Button>
      </div> */}

      <div className="hero-content flex justify-between max-lg:justify-center max-lg:flex-col max-lg:mx-10  mx-48">
        <div className="left flex flex-col max-lg:w-full justify-center max-lg:items-center">
          <div className="upper-txt text-bgl font-[Montserrat]  font-extrabold text-5xl max-md:text-4xl max-sm:text-[1.3rem] tracking-wide leading-[4rem] ">
            <h1 className="w-x max-sm: max-lg:w-full ">
              Say goodbye to neck and back pain with{" "}
            </h1>
          </div>
          <div className="main-txt">
            <h1 className="m-txt h-th text-bght font-[Noto+Sans] ml-[-.5rem] max-lg:m-0 max-lg:h-auto font-black text-fs2 max-lg:text-[15rem] max-md:text-[12rem] max-sm:text-[7rem] max-sm:leading-[8rem] leading-[12rem] ">
              ESSENCE{" "}
            </h1>
            {/* <div className="main-side-txt border-[#156669] w-[25rem] h-[5rem] border-b-[.5rem] border-r-[.5rem] ml-[40rem]">
              <h1 className="pl-[7rem] text-[#156669] font-[Lilita+one] font-bold text-[2.2rem]">
                posture alerts.{`"`}
              </h1>
            </div> */}
          </div>

          {/* hidden tag only for small screen */}
          <div className="hidden max-lg:block rounded-xl tabShadow4 mt-10  bg-[#00000050] border border-bgl py-5 px-4">
            <p className="text-center font-[Montserrat] leading-9 text-xl text-slate-200 ">
              Essence, a health-focused app for developers, uses Tensorflow to
              track posture, sets daily PC usage targets, awards points for good
              posture and goal achievement, and offers ambient sounds for a
              focused work environment.
            </p>
          </div>

          <div className="nav-btn-container mt-10  ">
            <button className="navbtn ">
              <div
                className="nav-link flex items-center border border-bgl relative overflow-hidden text-bght font-[Montserrat] font-[600] rounded-[20rem] text-b1 p-8 pr-28"
                onClick={redirectToDashboardHandler}
              >
                Get Started
                <div className="icon-btn py-8 w-16  rounded-round mr-4  bg-bght absolute flex items-center justify-center">
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
              </div>
            </button>
          </div>
        </div>

        <div className="right max-lg:hidden flex flex-col">
          <div className="right mr-40 flex flex-col">
            {/* <div className=" absolute rounded-full top-[-1rem] right-[50rem] rotate-[-45deg] h-[60rem] w-[10rem] bg-transparent border-4 border-[#0e948d8a]"></div> */}
            <div className="img-container absolute border-[#97c0bc]  w-[95rem] h-[90rem]" />
            <div className="left-img w-x1 z-10 h-x1 flex items-center justify-center  bg-bght">
              <img
                className="border-4 border-bgl rounded-round r-img "
                src={leftImg}
                alt=""
              />
            </div>
          </div>

          {/* nav */}
        </div>
      </div>
      <div className="icon-container flex max-lg:flex-col items-center justify-between mx-52 max-lg:mb-10 max-lg:mx-0">
        <ul className="icons flex gap-10 ml-4 max-lg:ml-0 max-lg:w-full items-center justify-center max-md:mb-10">
          <li>
            {" "}
            <a
              href="https://github.com/EssenceHQ/essence-frontend"
              target="_blank"
            >
              <FaLinkedinIn className=" icon w-11 h-11 text-bgl" />
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="https://github.com/EssenceHQ" target="_blank">
              <BsGithub className="icon w-11 h-11 text-bgl" />
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="https://x.com/parampragyan" target="_blank">
              <BsTwitter className="icon w-11 h-11 text-bgl" />
            </a>{" "}
          </li>
        </ul>
        <div className="z-40 max-lg:bg-transparent bg-bgl py-3 rounded-full px-6 max-lg:p-0">
          <CopyRight />
        </div>
        <div className="max-lg:hidden">
          <h1 className="text-3xl flex items-center font-[Noto+Sans] font-bold px-4 tag">
            Made with
            <AiTwotoneThunderbolt className="w-10 h-12 pl-1 text-bgl" />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
