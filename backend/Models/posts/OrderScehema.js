import mongoose from "mongoose";
const orderSchema = mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phoneNumber: {
      type: Number,
      default: null,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "cash",
    },
    quantity: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model("Order", orderSchema);
