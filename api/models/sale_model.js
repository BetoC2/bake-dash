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
  vendor: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    }
  ],
  paymentMethod: {
    type: String,
    enum: ["Efectivo", "Tarjeta"],
    required: true,
  },
  advance: {
    type: Number,
    default: 0,
    min: 0,
    required: false,
  },
  extraCost: {
    default: 0,
    type: Number,
    min: 0,
    required: false,
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
