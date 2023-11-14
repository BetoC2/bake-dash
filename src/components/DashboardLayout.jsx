import React, { useState, useEffect } from "react";
import "./styles/layout.scss";
import { HiMenuAlt2, HiUser } from "react-icons/hi";
import { RiDashboardFill } from "react-icons/ri";

function DashboardLayout({ children }) { 
  //Responsive openning
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

  //Dashboard
  //Openning
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);

  //Menus
  const Menus = [
    {title:"Dashboard", src:"#"},
    {title:"Produtos", src:"#"},
    {title:"Usuarios", src:"#"}
  ]

  return (

    <div className="layout-content">
        {isMobile ? (
          <button
            type="button"
            className="menu-button absolute right-0 top-0 p-5"
            onClick={toggleMenu}
          >
            <HiMenuAlt2 className="text-3xl" />
          </button>
        ) : (
          //DESKOPT
          <div className="flex">
            <div className={` ${isDashboardOpen ? 'w-72' : 'w-20'} h-screen bg-purple-400 relative duration-300 p-5 pt-8`}>
              <HiMenuAlt2 onClick={() => setIsDashboardOpen(!isDashboardOpen)} className={`text-2xl  absolute cursor-pointer -right-3 top-9 w-7 border-2 border-purple rounded-full`}/>
              <div className="flex gap-x-4 items center">
                <HiMenuAlt2 className={`cursor-pointer duration-500`}/>
                <h1 className={`${!isDashboardOpen && "scale-0"} text-white origin-left font-medium duration-300`}>Designer</h1>
              </div>
              <ul className="pt-6">
                {Menus.map((menu, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-orange-800 rounded-md">
                    <HiMenuAlt2 className={`text-xl cursor-pointer duration-500`}/>
                    <span className={`${!isDashboardOpen && 'hidden'} origin-left duration-200`} >{menu.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 text-2xl font-semibold flex-1 h-screen">
              <h1>Home Page</h1>
            </div>
          </div>

        )}

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

      <main>{children}</main>

      <footer>{/* Contenido del pie de página si es necesario */}</footer>
    </div>
  );
}

export default DashboardLayout;
