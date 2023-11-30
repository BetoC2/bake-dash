import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./Routes";
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
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<Error404 />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/sales" element={<Sales />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
