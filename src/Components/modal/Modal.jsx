import React from "react";

const Modal = ({ isOpen, onCloseHandler }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scale-125">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/*content*/}
            <div className="relative z-[500] flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 bg-bgl rounded-t-lg border-blueGray-200">
                <h3 className="text-3xl font-semibold text-white">
                  Welcome to Posture Alert
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onCloseHandler}
                >
                  <span className="text-4xl">×</span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-xl leading-relaxed font-400 text-gray-800">
                  Hey there! Excited to have you on board. Our app is getting a
                  makeover, and you're one of the first to experience it. Don't
                  miss out on our posture alert feature – make sure to enable
                  camera📸 and notifications🔔 of desktop for the best
                  experience!{" "}
                  <span className="font-bold text-xl">(In Beta Mode)</span>
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 bg-gray-100 rounded-b-lg border-blueGray-200">
                <button
                  className="bg-bgl text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onCloseHandler}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
      )}
    </>
  );
};

export default Modal;
