import React from "react";
import brandLogo from "../assets/img/bmagallanes_logo.png";
import bgImage from "../assets/img/login_bg.webp";

function Login() {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center relative">
        <img src={brandLogo} alt="Logo" className=" w-40 h-28 absolute top-4 left-4 h-4" />
        <div className="w-full md:w-3/4 p-8">
          <h2 className="text-5xl mb-8 text-center">Inicia Sesión</h2>
          <form>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                placeholder="Usuario"
                className=" bg-main-gray w-full rounded-md p-2 outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className="w-full bg-main-gray rounded-md p-2 outline-none"
              />
            </div>
            <div className="mb-4 flex items-center justify-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="remember">Recuérdame</label>
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md w-full"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:block w-1/2 bg-cover bg-center rounded-tl-2xl rounded-bl-2xl" style={{ backgroundImage: `url(${bgImage})` }}></div>
    </div>
  );
}

export default Login;
