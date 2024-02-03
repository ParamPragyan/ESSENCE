/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const Button = ({ onClick, text }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="text-slate-50 hover:bg-bgl/80 text-3xl border border-[#156669] bg-[#156669] py-2 px-3 rounded-lg"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
