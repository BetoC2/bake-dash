import React from "react";
import { ImCross } from "react-icons/im";
import "./styles/Modal.css";

export default function Modal({
  children,
  modalState,
  changeModalState,
  isMobile,
  setIsMobile,
  width = "46vw",
  title = "Modal",
}) {
  // TODO: Manejar cuando es un dispositivo móvil

  const overlay = `
    w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 pt-10 pb-10 flex items-center justify-center z-10
  `;

  const modalContainer = `
    h-[97vh] bg-white relative rounded-md shadow-md flex flex-col overflow-hidden
  `;
  const modalContainerStyle = {
    width: isMobile ? '95%' : width,
  }
  const closeButton = `
    absolute top-4 right-4 w-4 h-4 border-none bg-none cursor-pointer transition duration-300 ease-in-out rounded-md text-gray-700
    hover:bg-gray-200
  `;

  const modalContent = `mx-auto flex-1 overflow-auto`;

  const modalHeader = `mx-auto sticky top-0 bg-white flex items-center justify-center pt-6`;

  return (
    <>
      {modalState && (
        <div className={overlay}>
          <div
            className={modalContainer}
            style={modalContainerStyle}
          >
            <div
              className={`${modalHeader} ${isMobile ? "w-[95%]" : "w-[66%]"}`}
            >
              <h3 className="font-semibold text-4xl text-[#222222] text-center">
                {title}
              </h3>
            </div>
            <div
              className={closeButton}
              onClick={() => changeModalState(false)}
            >
              <ImCross className="hover:bg-gray-200" />
            </div>
            <div
              className={`${modalContent} ${isMobile ? "w-[95%]" : "w-[66%]"}`}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
