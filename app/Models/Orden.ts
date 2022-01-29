import mongoose from "mongoose";

const SchemaOrder = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    direccionEnvio: {
      direccion: { type: String, required: true },
      // ciudad: { type: String, required: true },
      // cp: { type: String, required: true },
      // prov: { type: String, required: true },
      // pais: { type: String, required: true },
    },
    metodoDePago: {
      type: String,
      required: true,
    },
    resultadoDelPago: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", SchemaOrder);
