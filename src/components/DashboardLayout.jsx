import React, { useState, useEffect } from "react";
import "./styles/layout.scss";
import { HiMenuAlt2, HiUser } from "react-icons/hi";
import { RiDashboardFill } from "react-icons/ri";
import { BsArrowRightSquareFill } from "react-icons/bs";
import bakeryLogo from "../assets/img/bmagallanes_logo.png"

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
    { title: "Dashboard", icon: <RiDashboardFill className={`text-3xl cursor-pointer duration-500`} /> },
    { title: "Produtos", icon: <HiMenuAlt2 className={`text-3xl cursor-pointer duration-500`} /> },
    { title: "Usuarios", icon: <HiUser className={`text-3xl cursor-pointer duration-500`} /> }

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
        <div className="main-container flex">
          <div className={` ${isDashboardOpen ? 'w-72' : 'w-20'} deskopt-navbar h-screen duration-300 p-5 pt-8 pb-8 pl-4 pr-4 rounded-3xl relative top-0 left-0 m-5 flex flex-col items-center`} style={{ height: 'calc(100vh - 45px)' }}>
            <BsArrowRightSquareFill onClick={() => setIsDashboardOpen(!isDashboardOpen)} className={`${isDashboardOpen && "rotate-180"} text-4xl absolute cursor-pointer -right-3 top-9 w-7 `} />
            <div className="flex gap-x-4 items-center justify-center"> 
              <img src={bakeryLogo} alt="" className={`${!isDashboardOpen && "scale-0"} w-40 text-white cursor-pointer`} />
            </div>
            <ul className="pt-6">
              {Menus.map((menu, index) => (
                <li key={index} className="text-sm flex items-center gap-x-4 cursor-pointer p-2 pl-4 pr-4 hover:bg-orange-800 rounded-md">
                  {menu.icon}
                  <span className={`${!isDashboardOpen && 'hidden'} origin-left duration-200 text-2xl`} >{menu.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-7 text-2xl font-semibold flex-1 h-screen">
            <main>{children}</main>
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
          <ul className="mobile-menu text-white mt-14 ml-4 absolute left-0 top-0 p-5">
            <li className="mb-4 flex items-center">
              <RiDashboardFill className="mr-2" />
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

      <footer>{/* Contenido del pie de página si es necesario */}</footer>
    </div>
  );
}

export default DashboardLayout;
