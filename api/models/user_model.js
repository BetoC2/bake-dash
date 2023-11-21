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
  age: {
    type: Number,
    min: 0,
    max: 120,
    required: true,
  },
  employment: {
    type: String,
    //enum: ["student", "employed", "unemployed"],
    //default: "unemployed",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
