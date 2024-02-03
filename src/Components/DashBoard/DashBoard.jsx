import Panel from "../Panel/Panel";

import AsmrPanel from "../ASMR/AsmrPanel";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authCtx } from "../../store/auth-context";

const DashBoard = () => {
  const AuthContext = useContext(authCtx);
  const userId = AuthContext.userInfo.userId;
  return (
    <>
    <div className="bg-[#021420] relative w-full h-screen flex max-md:hidden  items-center justify-center">
      {/**panel  */}
      <div className="w-1/2 h-1/3  ">
        <Panel></Panel>
      </div>
      {/*panel end */}

      {/* SoundPanel */}

      <AsmrPanel></AsmrPanel>

      <Link to={`/stats/${userId}`} className="text-slate-50 text-3xl">
        Stats
      </Link>
    </div>
    <div className="hidden max-md:inline-flex  bg-[#021420] relative w-full h-screen  items-center justify-center">
      <p className="text-4xl font-extrabold font-[Montserrat] leading-[4rem] text-bgl text-center mx-10">Switch to a desktop or laptop to access this application.</p>
    </div>
    </>
    
  );
};

export default DashBoard;
