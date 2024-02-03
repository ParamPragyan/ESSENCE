/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import SignUp from "../SignUp/SignUp";
const AuthModel = ({ showAuthHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay showAuthHandler={showAuthHandler}></OverLay>,
        document.getElementById("model")
      )}
    </>
  );
};

const OverLay = ({ showAuthHandler }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen ">
      <div className="relative w-full h-screen top-0 left-0 flex items-center justify-center">
        <div
          onClick={showAuthHandler}
          className="absolute top-0 left-0 z-50 w-full h-screen bgs3  bg-[#06060684] flex items-center justify-center"
        ></div>
        <div className="absolute z-[51]">
          <SignUp showAuthHandler={showAuthHandler}></SignUp>
        </div>
      </div>
    </div>
  );
};
export default AuthModel;
