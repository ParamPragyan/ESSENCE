import AuthModel from "../Components/Authentication/AuthModel/AuthModel";
import Home from "../Components/Home/Home";
import { useState, useContext } from "react";
import { authCtx } from "../store/auth-context";
import BetaBanner from "../Components/BetaBanner/BetaBanner";
const HomePage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const showAuthHandler = () => {
    setShowAuth((state) => !state);
  };
  const [register, setRegister] = useState(true);
  console.log(register);
  const authContext = useContext(authCtx);
  return (
    <div>
      <Home
        register={register}
        setRegister={setRegister}
        showAuthHandler={showAuthHandler}
      ></Home>
      {!authContext.userInfo.isLoggedIn && showAuth && (
        <AuthModel
          register={register}
          setRegister={setRegister}
          showAuthHandler={showAuthHandler}
        ></AuthModel>
      )}
      <BetaBanner></BetaBanner>
    </div>
  );
};

export default HomePage;
