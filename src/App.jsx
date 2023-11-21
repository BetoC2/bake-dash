import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Products,
  Users,
  Error404,
  Sales,
  // NotFound,
  // Portfolio,
  // AboutUs,
  // LandingPages,
  // WebApp,
  // Ecommerce
} from "./views";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* No conectado por HTML */}
        <Route path="/login" element={<Login />} />
        {/* No conectado por HTML */}
        <Route path="/404" element={<Error404 />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        {/* No conectado por HTML */}
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
