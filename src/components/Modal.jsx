import React from "react";
import { ImCross } from "react-icons/im";
import "./Modal.css";

export default function Modal({
  children,
  state,
  changeState,
  title = "Modal",
}) {
  return (
    <>
      {state && (
        <div className="overlay">
          <div className="modal-container">
            <div className="modal-elements">
              <div className="modal-header ">
                <h3 className="font-medium text-5xl text-[#222222] text-center">
                  {title}
                </h3>
              </div>
              <ImCross
                onClick={() => changeState(false)}
                className="btn-close hover:bg-[#f2f2f2]"
              />
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
