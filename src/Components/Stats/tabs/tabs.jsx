import React from 'react'

const tabs = ({ stats, loading }) => {
       
    const calculateStatistics = () => {
        let totalSpentTime = 0;
        let totalNotified = 0;
        let last7DaysAvg = "0:00"; 
        let lastDayTimeSpent = 0;
    
        if (stats.length > 0) {
          stats.forEach((stat) => {
            totalSpentTime += stat.timeSpent;
            totalNotified += stat.notified;
          });
    
          const last7DaysStats = stats.slice(-7);
          if (last7DaysStats.length > 0) {
            const totalTimeSpentInLast7Days = last7DaysStats.reduce(
              (total, stat) => total + stat.timeSpent,
              0
            );
            const avgTimeSpentInMinutes = totalTimeSpentInLast7Days / last7DaysStats.length;
            const avgHours = Math.floor(avgTimeSpentInMinutes / 60);
            const avgMinutes = Math.floor(avgTimeSpentInMinutes % 60); 
            const formattedAvgHours = String(avgHours).padStart(2, "0");
            const formattedAvgMinutes = String(avgMinutes).padStart(2, "0");
            last7DaysAvg = `${formattedAvgHours}:${formattedAvgMinutes}`;
            
          }
    
          lastDayTimeSpent = stats[stats.length - 1].timeSpent;
    
          const totalHours = Math.floor(totalSpentTime / 3600);
          const totalMinutes = Math.floor((totalSpentTime % 3600) / 60);
          totalSpentTime = `${totalHours}:${
            totalMinutes < 10 ? "0" : ""
          }${totalMinutes}`;
    
          const lastDayHours = Math.floor(lastDayTimeSpent / 3600);
          const lastDayMinutes = Math.floor((lastDayTimeSpent % 3600) / 60);
          lastDayTimeSpent = `${lastDayHours}:${
            lastDayMinutes < 10 ? "0" : ""
          }${lastDayMinutes}`;
        }
    
        return [
          { label: "Total Time Spent", value: totalSpentTime },
          { label: "Number of Notifications", value: totalNotified },
          { label: "Average Time Spent(Last 7 Days)", value: last7DaysAvg },
          { label: "Current Day Time Spent", value: lastDayTimeSpent },
        ];
      };

      const statistics = calculateStatistics();

    
  return (
    <div className="flex items-center justify-between gap-11 w-full ">

              {statistics.map((stat, index) => (
                <div className="flex-1" key={index}>
                  <div className="flex flex-col items-center justify-center gap-4 border border-bgl max-w-[34.5rem] min-w-full tabShadow p-10 rounded-xl ">
                    {!loading ?(
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="text-8xl font-bold text-bght">{stat.value}</div>
                               <div className="text-[1.3rem] font-bold text-bgl">{stat.label}</div>
                      </div>
                               
           
                    ):(
                      <div className="text-[2.6rem] p-10">
                        Loding...
                      </div>
                    )}
                    
                  </div>
                </div>
              ))}
            </div>
  )
}

export default tabs


