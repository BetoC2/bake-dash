import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
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
      },
    },
  ],
  datetime: {
    type: Date,
    required: true,
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
