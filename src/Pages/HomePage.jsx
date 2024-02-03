import AuthModel from "../Components/Authentication/AuthModel/AuthModel";
import Home from "../Components/Home/Home";
import { useState, useContext } from "react";
import { authCtx } from "../store/auth-context";
const HomePage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const showAuthHandler = () => {
    setShowAuth((state) => !state);
  };
  const authContext = useContext(authCtx);

  return (
    <div>
      <Home showAuthHandler={showAuthHandler}></Home>
      {!authContext.userInfo.isLoggedIn && showAuth && (
        <AuthModel showAuthHandler={showAuthHandler}></AuthModel>
      )}
    </div>
  );
};

export default HomePage;
