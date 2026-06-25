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
      required: true, // 👈 'require' ko 'required' kar diya
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "Product category is required"], // Isko bhi required rakhna behtar hai
    // },
    image: {
      type: String,
      default: "",
    },
    des: {
      type: String,
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
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Product", ProductSchema);
