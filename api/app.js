import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import BarcodeScanner from "./barcodeScanner";
import React from "react";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// En la misma página, podríamos hacer aparacer un modal
app.post("/barcode", async (req, res) => {
  const { code } = req.body;

  try {
    console.log("Código de barras recibido:", code);
    res.status(200).json({ message: "Código de barras guardado con éxito" });
  } catch (error) {
    console.error("Error al guardar el código de barras en la base de datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const handleBarcodeRead = async (code) => {
  try {
    const response = await fetch("http://localhost:3000/barcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error al enviar el código de barras al servidor:", error);
  }
};

/*
const App = () => {
  return (
    <div>
      <h1>Barcode Scanner App</h1>
      <BarcodeScanner onBarcodeRead={handleBarcodeRead} />
    </div>
  );
};
*/
export default app;
