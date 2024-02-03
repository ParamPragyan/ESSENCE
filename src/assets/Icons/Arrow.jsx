/* eslint-disable react/prop-types */
const Arrow = ({ rotate }) => {
  const style = rotate ? "rotate-180" : "";
  return (
    <div className="flex justify-end bg-[#bcd7d1]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={` text-slate-50  h-[4rem]  w-[4rem] ${style} transition-all duration-500 `}
        viewBox="0 0 24 24"
        fill="blue"
      >
        <title>arrow-left-thin</title>
        <path d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" />
      </svg>
    </div>
  );
};

export default Arrow;
