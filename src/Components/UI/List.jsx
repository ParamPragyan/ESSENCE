/* eslint-disable react/prop-types */

const List = ({ onClick, text, menuHandler }) => {
  const onClickHandler = () => {
    console.log(+text);
    console.log("hsadfsdf");
    onClick(+text);
    menuHandler();
  };
  return (
    <>
      <li onClick={onClickHandler} className="nav__submenu-item font-[3rem]  ">
        <div
          className="flex m-2  px-8 text-3xl font-bold text-gray-400 rounded-md hover:bg-bgl
  hover:text-white cursor-pointer "
        >
          {text}
        </div>
      </li>
    </>
  );
};

export default List;
