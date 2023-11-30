import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components";

function Home() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [sales, setSales] = useState([]);
  const [money, setMoney] = useState(0);

  const fetchSalesData = async () => {
    try {
      const response = await fetch("http://localhost:3000/sale");
      if (response.ok) {
        const responseData = await response.json();
        const salesData = responseData.sales; // Accediendo a la propiedad 'sales' del objeto
        setSales(salesData);
      } else {
        throw new Error("Error al obtener los datos de ventas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalMoney = async () => {
    const totalMoney = sales.reduce((accumulator, sale) => {
      return accumulator + sale.total;
    }, 0);
    setMoney(totalMoney);
  };

  useEffect(() => {
    fetchSalesData();
    getTotalMoney();
  }, []);

  useEffect(() => {
    setCurrentPage("Dashboard");
  }, []);

  return (
    <DashboardLayout currentPage={currentPage}>
      <h1 className="text-4xl mb-8">Datos Analíticos</h1>
      <div
        className={`bg-main-white rounded-2xl p-8 `}
        style={{ height: "calc(78vh - 45px)" }}
      >
        <div className="p-4 rounded-2xl bg-main-blue w-1/2 ">
          <p className="text-3xl font-normal">Ingresos</p>
          <p className="text-3xl font-bold">${money}</p>
          <p className="text-sm text-gray-500 font-normal">Hasta la fecha</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
