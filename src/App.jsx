import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Products,
  Users,
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
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />

        {/* <Route path="/Portafolio" element={<Portfolio />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/LandingPages" element={<LandingPages />} />
      <Route path="/WebApp" element={<WebApp />} />
      <Route path="/Ecommerce" element={< Ecommerce/>} />
      <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
