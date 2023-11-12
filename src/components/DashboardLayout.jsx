import React, { useState, useEffect } from "react";
// import "./styles/layout.scss";
import { HiMenuAlt2 } from "react-icons/hi";

function DashboardLayout({ children }) {
  // const [isMobile, setIsMobile] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 1000);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // const mobileMenuClasses = `mobile-menu fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-opacity duration-300 ${
  //   isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  // }`;

  return (
    <div className="layout-content">
      <h1>Layout</h1>
      <main>{children}</main>

      <footer>{/* Contenido del pie de página si es necesario */}</footer>
    </div>
  );
}

export default DashboardLayout;
