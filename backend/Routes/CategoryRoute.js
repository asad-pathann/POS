import express from "express";
import {
  CategoryControll,
  getCategory,
} from "../Controller/CategoryControll.js";

export const router = express.Router();

// CREATE CATEGORY
router.post("/post-category/:product_id", CategoryControll);
router.get("/get-category", getCategory);
