import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter The Product Name "],
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    price: {
      type: Number,
      required: [true, "Enter The price "],
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    category: {
      type: String,
    },

    barcode: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Product", ProductSchema);
