import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/layout.scss";
import { HiMenuAlt2, HiUser } from "react-icons/hi";
import { RiDashboardFill, RiLogoutBoxLine } from "react-icons/ri";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { BiBarcode } from "react-icons/bi";
import { FaBell, FaMoneyBillWave } from "react-icons/fa";
import brandLogo from "../assets/img/bmagallanes_logo.png"
import userImg from "../assets/img/user.png"

function DashboardLayout({ children, currentPage }) {

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

  //DAHSBOARD MANAGEMENT: ALLLOWS MAINTINING DASHBOARD OPEN WHEN CHANGING VIEW
  // Openning state for Dashboard using sessionStorage
  const [isDashboardOpen, setIsDashboardOpen] = useState(() => {
    const storedDashboardState = sessionStorage.getItem('dashboardState');
    return storedDashboardState ? JSON.parse(storedDashboardState) : true;
  });

  useEffect(() => {
    // Update sessionStorage when isDashboardOpen changes
    sessionStorage.setItem('dashboardState', JSON.stringify(isDashboardOpen));
  }, [isDashboardOpen]);



  // Session Storage Call
  const sesion = JSON.parse(sessionStorage.getItem("sesion"));

  // Menus
  let Menus = [];

  if (sesion && sesion.employment === "Admin") {
    Menus = [
      { title: "Dashboard", href: "/", icon: <RiDashboardFill className={`text-3xl cursor-pointer duration-500`} /> },
      { title: "Productos", href: "/products", icon: <BiBarcode className={`text-3xl cursor-pointer duration-500`} /> },
      { title: "Usuarios", href: "/users", icon: <HiUser className={`text-3xl cursor-pointer duration-500`} /> },
      { title: "Ventas", href: "/sales", icon: <FaMoneyBillWave className={`text-3xl cursor-pointer duration-500`} /> }
    ];
  } else if (sesion && sesion.employment === "Vendedor") {
    Menus = [
      { title: "Ventas", href: "/sales", icon: <FaMoneyBillWave className={`text-3xl cursor-pointer duration-500`} /> }
    ];
  }

  return (

    <div className="layout-content">
      {isMobile ? (
        <div>
          <button
            type="button"
            className="menu-button absolute right-0 top-0 p-5"
            onClick={toggleMenu}
          >
            <HiMenuAlt2 className="text-3xl" />
          </button>
          <div className="flex gap-x-4 items-center justify-left pl-8">
            <img src={brandLogo} alt="" className={`$ w-40 text-main-white cursor-pointer`} />
          </div>
          <main className="">{children}</main>

        </div>

      ) : (
        //DESKOPT
        <div className="main-container flex overflow-hidden">
          <div className="flex justify-between items-center navbar fixed top-0 w-full bg-main-gray z-9">
            <img src={brandLogo} alt="" className="w-40 text-main-white cursor-pointer ml-8" />
            <div className="relative">
              <FaBell
                className="text-3xl text-main-dark bg-gray-200 cursor-pointer mr-8"
                style={{ padding: '8px', borderRadius: '20%' }}
              />
            </div>
          </div>

          <div className={` ${isDashboardOpen ? 'w-72' : 'w-20'} mt-32 deskopt-navbar h-screen duration-300 p-5 pt-8 pb-8 pl-4 pr-4 rounded-3xl relative top-0 left-0 m-5 flex flex-col items-center`} style={{ height: 'calc(86vh - 45px)' }}>
            <div className="flex gap-x-4 items-center justify-center">
              <img src={userImg} alt="" className={`w-12 text-main-white cursor-pointer duration 500`} />
              <h1 className={`${!isDashboardOpen && 'hidden'} text-main-dark origin-left duration-300 text-xl`}>{sesion.name}</h1>
            </div>
            <BsArrowRightSquareFill onClick={() => setIsDashboardOpen(!isDashboardOpen)} className={`${isDashboardOpen && "rotate-180"} text-4xl absolute cursor-pointer -right-3 top-9 w-7`} />
            <ul className="pt-6">
              {Menus.map((menu, index) => (
                <Link key={index} to={menu.href} className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 pl-8 pr-8 mb-3 sm:pl-4 sm:pr-4 hover:bg-main-dark hover:text-main-white rounded-md ${currentPage === menu.title ? 'bg-main-dark text-main-white' : ''}`}>
                  {menu.icon}
                  <span className={`${!isDashboardOpen && 'hidden'} origin-left duration-200 text-2xl`} >{menu.title}</span>
                </Link>
              ))}
            </ul>
            {/* LOGOUT */}
            <div className="mt-auto">
              {/* Usa este div para hacer el logout Alb */}
              <div className="flex justify-end">
                <RiLogoutBoxLine className={`text-3xl cursor-pointer duration-500`} />
                <span className={`${!isDashboardOpen && 'hidden'} origin-left duration-200 text-2xl`} >Logout</span>
              </div>
            </div>
          </div>
          <div className="main-content p-7 text-2xl font-semibold flex-1 h-screen overflow-y-auto">
            {/* bg-main-white rounded-3xl min-h-[94vh] */}
            <main className="mt-24">{children}</main>
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
              <a href="/" onClick={toggleMenu}>
                Dashboard
              </a>
            </li>
            <li className="mb-4 flex items-center">
              <BiBarcode className="mr-2" />
              <a href="/products" onClick={toggleMenu}>
                Productos
              </a>
            </li>
            <li className="mb-4 flex items-center">
              <HiUser className="mr-2" />
              <a href="/users" onClick={toggleMenu}>
                Usuarios
              </a>
            </li>
          </ul>
        </div>
      )}

      <footer>{/* Contenido del pie de página si es necesario */}</footer>
    </div>
  );
}

export default DashboardLayout;
