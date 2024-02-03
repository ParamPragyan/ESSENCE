import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

const Radial = ({ stats }) => {
  const calculateEfficiency = () => {
    if (stats.length > 0) {
      const totalLast7DaysTime = stats
        .slice(-7)
        .reduce((total, stat) => total + stat.timeSpent, 0);

      const last7daysTime = totalLast7DaysTime / 60;

      const totalLast7DaysNotified = stats
        .slice(-7)
        .reduce((total, stat) => total + stat.notified, 0);

      console.log(last7daysTime);
      console.log(totalLast7DaysNotified);

      if (
        typeof last7daysTime === "number" &&
        typeof totalLast7DaysNotified === "number" &&
        totalLast7DaysNotified !== 0
      ) {
        const efficiency =
          100 - ((totalLast7DaysNotified * 0.33) / last7daysTime) * 100;
        return efficiency.toFixed(2);
      } else if (totalLast7DaysNotified === 0) {
        return "100.00";
      }
    }

    return 0;
  };

  const efficiency = calculateEfficiency();
  console.log(efficiency);
  const data3 = [
    { name: "Efficiency", Efficiency: efficiency, fill: "#b1d83c" }, 
  ];



  const CustomTooltip1 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-bgd tabShadow3 border border-bgl rounded-2xl ">
          <p className="label text-2xl font-semibold p-4 text-bght">
            {`Efficiency`} : {efficiency}%
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="80%">
      <RadialBarChart
        innerRadius="70%"
        outerRadius="110%"
        data={data3}
        startAngle={180}
        endAngle={-180}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={2}
          tick={false}
        />
        <RadialBar
          minAngle={15}
          label={{ fill: "#156669", position: "insideStart" }}
          background
          clockWise={true}
          dataKey="Efficiency"
          angleAxisId={2}
        />
        <Legend
          iconSize={10}
          width={80}
          height={200}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip content={<CustomTooltip1 />} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default Radial;
