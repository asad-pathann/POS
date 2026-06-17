import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProducts,
} from "../Controller/posts/ProductControll.js";

export const productRouter = express.Router();

//

productRouter.post("/post-product/:user_id", CreateProduct);

productRouter.get("/get-product", getAllProducts);

productRouter.get("/get-oneProduct/:id", getSingleProduct);

productRouter.put("/update-product/:product_id/:user_id", updateProducts);

productRouter.delete("/delete-product/:product_id/:user_id", DeleteProduct);
