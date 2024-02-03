/* eslint-disable react/prop-types */
import { useRef, useContext, useState } from "react";
import Button from "../../UI/Button";
import { authCtx } from "../../../store/auth-context";
import toast from "react-hot-toast";
const SignUp = ({ showAuthHandler }) => {
  const [register, setRegister] = useState(true);
  const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userCtx = useContext(authCtx);
  console.log("token" + userCtx.token);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (register) {
      const userName = userNameRef.current.value;
      if (userName.length === 0) {
        toast.error("Username is missing", {
          className: "text-5xl",
        });
        return;
      } else if (email.length === 0) {
        toast.error("Email is wrong", {
          className: "text-5xl",
        });
      }
      userCtx.register({ userName, email, password }).then(() => {
        showAuthHandler();
      });
    } else {
      userCtx.login({ email, password }).then(() => {
        showAuthHandler();
      });
    }
  };
  console.log(userCtx.userInfo);
  const regStyle = register ? "text-bgl" : "text-slate-50";
  const loginStyle = !register ? "text-bgl" : "text-slate-50";
  return (
    <div className="w-full h-full  max-md:py-14 px-16 py-20 gap-12 bg-bgd border border-bgl flex flex-col items-center justify-center rounded-3xl">
      <div className="flex gap-2 pb-5 ">
        <div className={`${regStyle} text-3xl border-r-2 px-2  border-r-white`}>
          SignUp
        </div>
        <div className={`${loginStyle} text-3xl`}>Login</div>
      </div>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        {register && (
          <div className="flex flex-col">
            <input
              ref={userNameRef}
              className="text-3xl text-slate-50 placeholder:pl-2 bg-transparent border-2 border-bgl rounded-full px-16 py-6 max-md:text-2xl"
              placeholder="Username"
              type="text"
            ></input>
          </div>
        )}

        <div className="flex flex-col">
          <input
            ref={emailRef}
            type="text"
            className="text-3xl text-slate-50 placeholder:pl-2 bg-transparent border-2 border-bgl rounded-full px-16 py-6 max-md:text-2xl"
            placeholder="Email"
          ></input>
        </div>
        <div className="flex flex-col">
          <input
            ref={passwordRef}
            type="password"
            className="text-3xl text-slate-50 placeholder:pl-2 bg-transparent border-2 border-bgl rounded-full px-16 py-6 max-md:text-2xl"
            placeholder="Password"
          ></input>
        </div>
        <div className="w-full flex items-center justify-center pt-8">
          <Button
            onClick={() => {}}
            text={register ? "SignUp" : "Login"}
          ></Button>
        </div>
      </form>
      <p className="text-slate-50 text-2xl">
        Already a member?{" "}
        <button
          onClick={() => {
            setRegister((state) => {
              return !state;
            });
          }}
          className="text-bgl text-2xl"
        >
          {register ? "Login Now" : "SignUp Now"}
        </button>
      </p>
    </div>
  );
};

export default SignUp;
