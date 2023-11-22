// First version of barcodeScanner
import mongoose from "mongoose";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const mongoConnection = "mongodb+srv://admin:admin@myapp.mfg5ynr.mongodb.net/BakeDashDB";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoConnection, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

const barcodeSchema = new mongoose.Schema({
  code: String,
});

const Barcode = mongoose.model("Barcode", barcodeSchema);

app.use(bodyParser.json());

app.post("/barcode", async (req, res) => {
  const { code } = req.body;

  try{
    // Guardar el código en la base de datos
    const newBarcode = new Barcode({ code });
    await newBarcode.save();

    res.status(200).json({ message: "Código de barras guardado con éxito" });
  }catch (error) {
    console.error("Error al guardar el código de barras en la base de datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
