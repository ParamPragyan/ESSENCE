/* eslint-disable react/prop-types */
import List from "./List";

const timeArray = [10, 20, 30, 60, 120];
const DropDownMenu = ({ timeChangeHandler, menuHandler }) => {
  return (
    <ul className="nav__submenu absolute text-[1.2rem] p-1 border-bgl border-b-4  border-r-4  bg-[#000000] rounded text-black space-y-1 z-50">
      {timeArray.map((element, index) => {
        return (
          <List
            key={index}
            text={element}
            menuHandler={menuHandler}
            onClick={timeChangeHandler}
          ></List>
        );
      })}
    </ul>
  );
};
export default DropDownMenu;
