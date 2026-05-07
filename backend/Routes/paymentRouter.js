import express from "express";
import { createPayment } from "../Controller/posts/paymentControll.js";

export const PaymentRoute = express.Router();

PaymentRoute.post("/post-payment/:order_id", createPayment);
