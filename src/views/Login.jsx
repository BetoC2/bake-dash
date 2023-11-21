import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import brandLogo from "../assets/img/bmagallanes_logo.png";
import bgImage from "../assets/img/login_bg.webp";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      pass: password,
    };
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        sessionStorage.setItem("sesion", JSON.stringify(responseData));
        navigate("/");
      } else {
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center relative">
        <img
          src={brandLogo}
          alt="Logo"
          className={`$ w-40 text-main-white absolute top-1 left-4 cursor-pointer`}
        />
        <div className="w-full md:w-3/4 p-8">
          <h2 className="text-5xl mb-8 text-center">Inicia Sesión</h2>
          <form>
            <div className="mb-4">
              <input
                type="text"
                id="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualizar el estado 'username' al cambiar el valor
                className="bg-gray-200 w-full rounded-md p-2 outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualizar el estado 'password' al cambiar el valor
                className="w-full bg-gray-200 rounded-md p-2 outline-none"
              />
            </div>
            {/* ... Otros elementos del formulario ... */}
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md w-full"
              onClick={handleLoginClick} // Agregar el evento onClick aquí
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
      <div
        className="hidden md:block w-1/2 bg-cover bg-center rounded-tl-2xl rounded-bl-2xl"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
    </div>
  );
}

export default Login;
