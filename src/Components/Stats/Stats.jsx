import { useContext, useEffect, useState } from "react";
import { getUserStats, updateTimeSpent } from "../../helper/helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authCtx } from "../../store/auth-context";
import Tabs from "../Stats/tabs/tabs";
import ColumnChart from "./Charts/BarChart";
import Radial from "./Charts/Radial";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const authContext = useContext(authCtx);
  console.log(stats);
  useEffect(() => {
    const updateUserTime = async () => {
      try {
        const storageData = JSON.parse(localStorage.getItem("essence"));

        if (storageData?.timeSpent && authContext.userInfo.isLoggedIn) {
          //updating user time from the last login
          await updateTimeSpent(
            authContext.userInfo.userId,
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
    const getStats = async () => {
      try {
        const data = await getUserStats(params.id);
        console.log(data);
        if (data.code == 1) {
          setLoading(false);
          setStats(data.stats);
        } else {
          setLoading(false);
          throw new Error("user not found");
        }
      } catch (err) {
        console.log(err.message);
        navigate("/dashboard", { replace: true });
      }
    };
    const userAndStatHandler = async () => {
      await updateUserTime();
      await getStats();
    };
    setLoading(true);
    userAndStatHandler();
  }, []);

  return (
    <div className="bg-bgd h-full text-slate-50">
      {/* <div className="">{loading && <p></p>}</div> */}

      {/* <div className="text-1xl mx-48">
        {!loading && <p>{JSON.stringify(stats)}</p>}
      </div> */}

      {/* dashboard navigation */}
      {/* <div>
        <Link className="text-3xl" to="/dashboard">
          Dashboard
        </Link>
      </div> */}

      {/* start */}
      <div className="stats-frame px-48 py-28 flex flex-col gap-11 ">
        <div className="upper-tabs">
          <Tabs stats={stats} loading={loading} />
        </div>
        <div className="charts flex flex-col md:flex-row gap-11">
          <div className="w-[100%] h-[45rem]">
            <h1 className="text-center text-xl font-bold p-3 mb-11 bg-bgl border w-fit rounded-xl tabShadow border-bght text-bgd">
              Avg Time per Day
            </h1>
            <div className="left relative xl:w-[95%] lg:w-full h-[90%] flex items-end justify-center  rounded-xl ">
              <div className="flex flex-col pr-11">
                <ColumnChart stats={stats} />
              </div>
            </div>
          </div>

          <div className="right  w-[45%] h-[45rem] border border-bgl rounded-xl tabShadow2">
            <Radial stats={stats} />
            <div className="bg-bgl ">
              <p className="text-xl font-medium py-4 px-20 text-center">
                This chart shows how efficient someone is based on their
                usability of "ESSENCE".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
// ouhiufhui4hfuih9urhpuihrpuihpofjpo
