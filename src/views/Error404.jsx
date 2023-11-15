import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io"
import brandLogo from "../assets/img/bmagallanes_logo.png";
import bgImage from "../assets/img/404_bg.webp";

function Error404() {

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
        <img src={brandLogo} alt="Logo" className="w-40 h-24 absolute top-4 left-4 h-4" />
        <div className="w-full md:w-3/4 p-8 flex flex-col items-center">
          <h1 className="mb-4 sm:text-9xl" style={{ fontSize: "13rem" }}>404</h1>
            <h2 className="text-xl mb-8">Página no encontrada</h2>
            <div className="mt-16">
              <a href="/" className="flex items-center text-5xl">
                <IoIosArrowRoundBack />
                <span className="ml-2">REGRESAR</span>
              </a>
            </div>
        </div>
      </div>
      <div className="hidden md:block w-1/2 bg-cover bg-center rounded-tl-2xl rounded-bl-2xl" style={{ backgroundImage: `url(${bgImage})` }}></div>
    </div>
  );
}

export default Error404;