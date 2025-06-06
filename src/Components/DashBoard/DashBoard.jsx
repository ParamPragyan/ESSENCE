import Panel from "../Panel/Panel";
import { useState } from "react";
import AsmrPanel from "../ASMR/AsmrPanel";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authCtx } from "../../store/auth-context";
import SideMenu from "../SideMenu/SideMenu";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Modal from "../modal/Modal";
const DashBoard = () => {
  const AuthContext = useContext(authCtx);
  const userId = AuthContext.userInfo.userId;

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    console.log("toggle");
    setIsOpen(!isOpen);
  };
  console.log(AuthContext);
  useEffect(() => {
    const updateUserTime = async () => {
      try {
        const storageData = JSON.parse(localStorage.getItem("essence"));

        if (storageData?.timeSpent && AuthContext.userInfo.isLoggedIn) {
          //updating user time from the last login
          await updateTimeSpent(
            AuthContext.userInfo.userId,
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
    updateUserTime();
  }, [AuthContext.userInfo.isLoggedIn, userId]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("essence"));
    if (AuthContext.userInfo.isLoggedIn) {
    }
  }, [AuthContext.userInfo.isLoggedIn]);

  useEffect(() => {
    if (
      AuthContext.userInfo.isLoggedIn &&
      !AuthContext.showOneTimeNotification
    ) {
      setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      AuthContext.setShowOneTimeNotificationHandler();
    }
  }, [AuthContext.userInfo.isLoggedIn]);
  return (
    <>
      <div className="bg-[#021420] relative w-full h-screen flex max-md:hidden  items-center justify-center">
        {/**panel  */}
        <SideMenu></SideMenu>
        <div className="w-1/2 h-1/3  ">
          <Panel></Panel>
        </div>
        {/*panel end */}

        {/* SoundPanel */}

        <AsmrPanel></AsmrPanel>
      </div>
      <div className="hidden max-md:inline-flex  bg-[#021420] relative w-full h-screen  items-center justify-center">
        <p className="text-4xl font-extrabold font-[Montserrat] leading-[4rem] text-bgl text-center mx-10">
          Switch to a desktop or laptop to access this application.
        </p>
      </div>
      <Modal isOpen={isOpen} onCloseHandler={toggleModal}></Modal>
    </>
  );
};

export default DashBoard;
