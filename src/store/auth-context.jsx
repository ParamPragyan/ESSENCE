/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { createContext, useEffect, useState, useCallback } from "react";
import { updateTimeSpent, formatDate } from "../helper/helper.js";

export const authCtx = createContext({
  token: "",

  userInfo: {
    userName: "",
    userId: "",
    authId: "",
    stats: [],
    goals: [],
    isLoggedIn: false,
  },

  login: () => {},
  logout: () => {},
  register: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userId: "",
    authId: "",
    stats: [],
    goals: [],
    isLoggedIn: false,
  });

  /* registering User */
  const createUserInDb = async (userName, email, authId) => {
    console.log("createUserInDb working");
    const userData = {
      userName: userName,
      email: email,
      authId: authId,
    };
    try {
      const res2 = await fetch(
        `${import.meta.env.VITE_API_END_POINT}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const jsonResponse = await res2.json();
      console.log(jsonResponse);
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 1) {
        return {
          userName: jsonResponse.data.userName,
          authId: jsonResponse.data.authId,
          userId: jsonResponse.data.userId,
        };
      } else {
        return {};
      }
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const register = async (info) => {
    const { userName, email, password } = info;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      import.meta.env.VITE_SOME_API_TOKEN
    }`;
    const loadingToast = toast.loading("Signing Up!", {
      className: "text-5xl",
    });
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: "true",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();
      setToken(data.localId);
      const userData = await createUserInDb(userName, email, data.localId);
      if (Object.keys(userData).length > 0) {
        const { userName, authId, userId } = userData;
        toast.success("Registered Successfully", {
          id: loadingToast,
          className: "text-5xl",
        });
        localStorage.setItem(
          "essence",
          JSON.stringify({
            authId: authId,
            timeSpent: 0,
            date: new Date(),
            notified: 0,
          })
        );
        setUserInfo((info) => {
          return { ...info, isLoggedIn: true, userName, authId, userId };
        });
      } else {
        throw new Error("Unable to create user in DB!");
      }
    } catch (err) {
      console.log("error: " + err);
      toast.error(`${err}`, { id: loadingToast, className: "text-5xl" });
    }
  };

  /* Login  */
  const checkUserInDb = async (authId) => {
    const userData = {
      authId: authId,
    };
    try {
      const res2 = await fetch(
        `${import.meta.env.VITE_API_END_POINT}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const jsonResponse = await res2.json();

      if (jsonResponse.code === 1) {
        const data = jsonResponse.data;
        return data;
      }
      if (jsonResponse.code === 0) {
        return {};
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async (info) => {
    const { email, password } = info;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
      import.meta.env.VITE_SOME_API_TOKEN
    }`;
    const loadingToast = toast.loading("Signing Up!", {
      className: "text-5xl",
    });
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: "true",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error.message);
      }

      const data = await response.json();
      setToken(data.localId);
      const userData = await checkUserInDb(data.localId);
      if (Object.keys(userData).length > 0) {
        const { userName, authId, userId } = userData;
        toast.success("Login Successfully!", {
          id: loadingToast,
          className: "text-5xl",
        });
        localStorage.setItem(
          "essence",
          JSON.stringify({
            authId: authId,
            timeSpent: 0,
            date: new Date(),
            notified: 0,
          })
        );
        setUserInfo((info) => {
          return { ...info, isLoggedIn: true, userName, authId, userId };
        });
      } else {
        throw new Error("Unable to find user info!");
      }
    } catch (err) {
      console.log("error: " + err);
      toast.error(`${err}`, { id: loadingToast, className: "text-5xl" });
    }
  };
  const logout = () => {
    setToken("");
    // to remove the user info from localstorage
    localStorage.removeItem("essence");

    setUserInfo({
      userName: "",
      userId: "",
      authId: "",
      isLoggedIn: false,
      stats: [],
      goals: [],
    });
  };

  const storeObj = {
    token,
    userInfo,
    login,
    logout,
    register,
  };
  const isAuthIdValid = useCallback(async () => {
    const storageData = JSON.parse(localStorage.getItem("essence"));
    console.log(userInfo.isLoggedIn);
    if (
      localStorage.getItem("essence") &&
      storageData.authId &&
      !userInfo.isLoggedIn
    ) {
      const userLocalAuthId = storageData.authId;
      //checking if the user is present in the db or not
      if (userLocalAuthId) {
        try {
          const userData = await checkUserInDb(userLocalAuthId);
          console.log(userData);
          if (Object.keys(userData).length > 0) {
            const { userName, authId, userId } = userData;

            setUserInfo((info) => {
              console.log("setting the user information");
              return { ...info, isLoggedIn: true, userName, authId, userId };
            });
          } else {
            localStorage.removeItem("essence");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    // if timeSpent is present then we will update the localstorage

    const storageDateAfterLogin = JSON.parse(localStorage.getItem("essence"));

    if (storageDateAfterLogin?.timeSpent && userInfo.isLoggedIn) {
      //updating user time from the last login
      await updateTimeSpent(
        userInfo.userId,
        storageData.timeSpent,
        storageData.notified,
        storageData.date
      );
      const todayDate = formatDate();
      localStorage.setItem(
        "essence",
        JSON.stringify({
          ...storageDateAfterLogin,
          date: todayDate,
          timeSpent: 0,
          notified: 0,
        })
      );
    }
  }, [userInfo.isLoggedIn, userInfo.userId]);
  // check if the user is authenticated or not
  useEffect(() => {
    isAuthIdValid();
    console.log("times");
  }, [isAuthIdValid]);
  return <authCtx.Provider value={storeObj}>{children}</authCtx.Provider>;
};

export default AuthContextProvider;
