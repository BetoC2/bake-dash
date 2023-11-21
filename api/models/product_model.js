import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: false,
    default:
      "https://raw.githubusercontent.com/BetoC2/PWeb/main/assets/licPugberto.jpg",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
