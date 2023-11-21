import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components";


function Home() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  useEffect(() => {
    setCurrentPage("Dashboard");
  }, []);


  return (
    <DashboardLayout currentPage={currentPage}>
      <h1 className="text-4xl mb-8">Datos Analíticos</h1>
      <div className={`bg-main-white rounded-2xl p-8 `} style={{ height: 'calc(78vh - 45px)' }}>
        <div className="p-4 rounded-2xl bg-main-blue w-1/2 ">
          <p className="text-3xl font-normal">Ingresos</p>
          <p className="text-3xl font-bold">$293,435.32</p>
          <p className="text-sm text-gray-500 font-normal">13-19 de noviembre</p>
        </div>
      </div>
    </DashboardLayout>
  );
  
}

export default Home;