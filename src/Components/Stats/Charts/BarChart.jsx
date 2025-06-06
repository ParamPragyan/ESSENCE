import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

const ColumnChart = ({stats, loading}) => {
    const formatMonthDate = (date) => {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        return `${month}-${day}`;
      };
    
      const createDataArray = () => {
        const last7Stats = stats.slice(-7).map((stat) => ({
          date: formatMonthDate(new Date(stat.date)),
          TimeSpent: stat.timeSpent || 0,
        }));
    
        return last7Stats;
      };
    
      const dataArray = createDataArray();
    
      console.log(dataArray);
    
      
    
      const formatDateLabel = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate();
        return `${month}-${day}`;
      };
    
      const customTooltipStyle = {
        backgroundColor: "#021420",
        color: "white",
        border: "1px solid #156669",
        boxShadow: "19px 19px 57px #010a10, -5px -5px 57px #031e30",
      };

  return (
    <div className="overflow-hidden ">
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dataArray}>
                        <CartesianGrid stroke="transparent" />
                        <XAxis
                          dataKey="date"
                          style={{
                            fontSize: "2rem",
                            fontFamily: "Times New Roman",
                          }}
                          label={{ fontSize: "2rem" }}
                        />
                        <YAxis
                          label={{
                            value: "Time Spent",
                            angle: -90,
                            position: "insideLeft",
                            fontSize: "2rem",
                          }}
                          style={{
                            fontSize: "2rem",
                            fontFamily: "Times New Roman",
                          }}
                        />
                        <Tooltip
                          contentStyle={customTooltipStyle}
                          lable={{
                            fontSize: "2rem",
                            fontFamily: "Times New Roman",
                            backgroundColor: "#000",
                          }}
                          cursor={{ fill: "transparent" }}
                          style={{
                            bgColor: "#000",
                            fill: "#000",
                          }}
                        />
                        <Legend />
                        <Bar
                          style={{
                            fontSize: "2rem",
                            fontFamily: "Times New Roman",
                          }}
                          radius={[100, 100, 0, 0]}
                          dataKey="TimeSpent"
                          fill="#b1d83c"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
  )
}

export default ColumnChart