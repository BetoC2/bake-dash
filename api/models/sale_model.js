import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  products: [
    {
      barcode: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        min: 1,
        required: true,
      },
      price: {
        type: Number,
        min: 0,
        required: true,
      }
    },
  ],
  datetime: {
    type: Date,
    required: false,
    default: Date.now,
  },
  vendor: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Efectivo", "Tarjeta"],
    required: true,
  },
  advance: {
    type: Number,
    min: 0,
    required: true,
  },
  extraCost: {
    type: Number,
    min: 0,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
  subtotal: {
    type: Number,
    min: 0,
    required: true,
  },
  total: {
    type: Number,
    min: 0,
    required: true,
  },
});

export default mongoose.model("Sale", saleSchema);
