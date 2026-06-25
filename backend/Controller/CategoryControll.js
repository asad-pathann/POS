import { Category } from "../Models/posts/category.js";

export const CategoryControll = async (req, res) => {
  try {
    const { name } = req.body;
    const { product_id } = req.params;

    if (!name || !product_id) {
      return res.status(400).json({
        message: "Enter the fields",
      });
    }

    const createCategory = await Category.create({
      name,
      product_id,
    });

    res.status(201).json(createCategory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    let getAllCategory = await Category.find()
      .populate("product_id") // 🔥 Ab yeh automatic us category ke saare products le aayega
      .sort({ createdAt: -1 }); // 🕒 Sahi timestamp field name

    return res.status(200).json(getAllCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
