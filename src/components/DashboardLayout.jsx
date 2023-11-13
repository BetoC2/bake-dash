import React, { useState, useEffect } from "react";
import "./styles/layout.scss";
import { HiMenuAlt2, HiUser } from "react-icons/hi";
import { RiDashboardFill} from "react-icons/ri";

function DashboardLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mobileMenuClasses = `mobile-menu fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`;

  return (

    <div className="layout-content">
      <header className="fixed flex justify-between items-center w-full text-xl p-5 pt-8">
        <a href="#" className="absolute pt-2">
          <img src="#" alt="" className="w-36" />
        </a>
        {isMobile ? (
          <button
            type="button"
            className="menu-button absolute right-0 top-0 p-5"
            onClick={toggleMenu}
          >
            <HiMenuAlt2 className="text-3xl" />
          </button>
        ) : (
          <nav className="flex-grow flex justify-center">
            <a href="#" className="mx-4">
              Dashboard
            </a>
            <a href="#products" className="mx-4">
              Productos
            </a>
            <a href="#users" className="mx-4">
              Usuarios
            </a>
            {/* <a href="#" className="mx-4">
              Almacén
            </a> */}
          </nav>
        )}
      </header>

      {isMobile && (
        <div className={mobileMenuClasses}>
          <button
            type="button"
            className={`menu-button absolute right-0 top-0 p-5 ${isMenuOpen ? 'text-white' : ''}`}
            onClick={toggleMenu}
          >
            <HiMenuAlt2 className="text-3xl" />
          </button>
          <ul className="mobile-menu text-white mt-14 ml-4 absolute left-0 top-0 p-5"> {/* Ajusta el margen superior y izquierdo según tus necesidades */}
            <li className="mb-4 flex items-center">
              <RiDashboardFill className="mr-2" /> {/* Sustituye HiMenuAlt2 con el icono deseado */}
              <a href="#" onClick={toggleMenu}>
                Dashboard
              </a>
            </li>
            <li className="mb-4 flex items-center">
              <HiMenuAlt2 className="mr-2" />
              <a href="#" onClick={toggleMenu}>
                Productos
              </a>
            </li>
            <li className="mb-4 flex items-center">
              <HiUser className="mr-2" />
              <a href="#" onClick={toggleMenu}>
                Usuarios
              </a>
            </li>
            {/* Agrega más elementos de la lista según sea necesario */}
          </ul>
        </div>
      )}
      <h1>Layout</h1>
      <main>{children}</main>

      <footer>{/* Contenido del pie de página si es necesario */}</footer>
    </div>
  );
}

export default DashboardLayout;
