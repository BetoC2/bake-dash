import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  employment: {
    type: String,
    enum: ["Vendedor", "Repartidor", "Almacen"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
