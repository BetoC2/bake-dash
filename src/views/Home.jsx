import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components";


function Home() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  useEffect(() => {
    setCurrentPage("Dashboard");
  }, []);

  
  return (
    <DashboardLayout currentPage={currentPage}>
      <h1>Home</h1>
    </DashboardLayout>
  );
}

export default Home;