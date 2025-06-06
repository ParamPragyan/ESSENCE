import React, { useState } from "react";
import classes from "./SideMenu.module.css";
import "boxicons/css/boxicons.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authCtx } from "../../store/auth-context";
import logo from "../../../public/logo2.png";
const sidebarItems = [
  {
    name: "Dashboard",
    icon: "bx bx-grid-alt",
    tooltip: "Dashboard",
    link: "/dashboard",
    dynamic: false,
  },
  // {
  //   name: "User",
  //   icon: "bx bx-user",
  //   tooltip: "User",
  //   link: "/user",
  //   dynamic: false,
  // },
  // {
  //   name: "Messages",
  //   icon: "bx bx-chat",
  //   tooltip: "Messages",
  //   link: "/messages",
  //   dynamic: false,
  // },
  {
    name: "Analytics",
    icon: "bx bx-pie-chart-alt-2",
    tooltip: "Analytics",
    link: "/stats",
    dynamic: true,
  },

  // {
  //   name: "Setting",
  //   icon: "bx bx-cog",
  //   tooltip: "Setting",
  //   link: "/setting",
  //   dynamic: false,
  // },
  {
    profile: true,
    icon: "bx bx-export",
    name: "Logout",
  },
];

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const authContext = useContext(authCtx);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen((state) => !state);
    menuBtnChange();
  };
  const AuthContext = useContext(authCtx);
  const userId = AuthContext.userInfo.userId;
  const logoutHandler = () => {
    navigate("/");
    authContext.logout();
  };
  const menuBtnChange = () => {
    const closeBtn = document.querySelector("#btn");
    if (isOpen) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  return (
    <>
      <div className={`${classes.sidebar} ${isOpen ? classes.open : ""}`}>
        <div className={classes["logo-details"]}>
          {/* <i className={`bx bxl-codepen ${classes.icon}`}></i> */}
          {/* <i
            className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"} icon`}
          ></i> */}
          <div onClick={() => navigate("/home")} className={classes.logo_name}>
            {" "}
            <div className="bar flex  items-center justify-center ">
              <img className="w-10 h-10" src={logo} alt="" />
              <h1 className="logo-txt text-bgl font-[Righteous]  text-b1">
                SSENCE
              </h1>
            </div>
          </div>
          <i
            className={`bx bx-menu`}
            style={{ cursor: "pointer" }}
            onClick={toggleSidebar}
            id="btn"
          ></i>
        </div>
        <ul className={classes["nav-list"]}>
          {sidebarItems.map((item, index) => {
            if (item.input) {
              return (
                <li key={index}>
                  <i className={item.icon} onClick={toggleSidebar}></i>
                  <input type="text" placeholder={item.placeholder} />
                  <span className={classes.tooltip}>{item.tooltip}</span>
                </li>
              );
            } else if (item.profile) {
              return (
                <li key={index} className={classes.profile}>
                  <div className={classes["profile-details"]}>
                    <i className={item.icon}></i>
                    <div className={classes.name_job}>
                      <div className={classes.name}>{item.name}</div>
                    </div>
                  </div>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={logoutHandler}
                    className="bx bx-log-out"
                    id="log_out"
                  ></i>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <NavLink
                    style={({ isActive, isPending, isTransitioning }) => {
                      return {
                        backgroundColor: isActive ? "#97c0bc" : "",

                        color: isPending ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                    className={classes.link}
                    to={item.dynamic ? `${item.link}/${userId}` : item.link}
                    href="#"
                  >
                    {({ isActive, isPending, isTransitioning }) => {
                      return (
                        <>
                          <i
                            style={{
                              color: isActive ? "#021420" : "",
                              fontSize: "1.5rem",
                            }}
                            className={item.icon}
                          ></i>
                          <span
                            style={{
                              color: isActive ? "#021420" : "",
                              fontSize: "1.5rem",
                            }}
                            className={classes.links_name}
                          >
                            {item.name}
                          </span>
                        </>
                      );
                    }}
                  </NavLink>
                  <span className={classes.tooltip}>{item.tooltip}</span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
