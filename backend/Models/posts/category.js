import mongoose from "mongoose";

const category = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // product_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Product",
  // },
});

export const Category = mongoose.model("Category", category);
