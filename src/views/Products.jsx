
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { DashboardLayout } from "../components";
import { CiCirclePlus } from "react-icons/ci";
import testImg from "../assets/img/products/product1.jpg";

function Products() {
  const [currentPage, setCurrentPage] = useState("Productos");

  useEffect(() => {
    setCurrentPage("Productos");
  }, []);


  return (
    <DashboardLayout currentPage={currentPage}>
      <div className="mb-8 flex flex-col items-center justify-center">
        <button className="flex items-center bg-main-dark text-main-white py-2 px-4 rounded-xl mb-8 text-xl lg:text-lg xl:text-lg ">
          {/* <FaPlus className="mr-2" /> */}
          Nuevo Producto
        </button>
        <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Buscar producto"
            className="p-2 pl-8 w-full rounded-3xl text-lg bg-main-white border-0 "
            style={{ paddingLeft: "3rem", outline: "none" }}
          />
          <div className="absolute inset-y-0 left-2 pl-2 flex items-center pointer-events-none">
            <FaSearch className="text-xl" />
          </div>
        </div>
      </div>
      <div className="p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full p-12 sm:p-8 lg:p-0 xl:p-0">
        {Array.from({ length: 36 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 w-full h-40 rounded-3xl flex items-center justify-center"
          >
            <img
              src={testImg}
              alt={`Producto ${index + 1}`}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Products;
