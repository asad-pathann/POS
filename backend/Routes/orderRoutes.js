import express from "express";
import {
  cancelOrder,
  createOrder,
  getOrder,
} from "../Controller/posts/orderController.js";

export const OrderRoutes = express.Router();

OrderRoutes.post("/post-order/:product_id/:user_id", createOrder);
OrderRoutes.get("/get-order", getOrder);
OrderRoutes.post("/cancel-order/:order_id", cancelOrder);
