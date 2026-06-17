import { Product } from "../../Models/posts/ProductsSchema.js";
import { User } from "./../../Models/Users/UserSchema.js";

export const CreateProduct = async (req, res) => {
  // find the user id

  const { user_id } = req.params;

  const { name, stock, category, price, image, des } = req.body;

  if (!name || !price || !stock) {
    res.status(404);
    throw new Error("Enter The All Fields");
  }

  const user = await User.findById(user_id);

  // check the users  admin hain ya nahi hain

  if (user.role !== "admin") {
    return res.status(400).json("Onle Admin Post The products");
  }

  await user.save();

  if (!user) {
    res.status(400);
    throw new Error("user  undefine");
  }

  // let checkBarCode = await Product.findOne({ barcode });
  // if (checkBarCode) {
  //   res.status(400);
  //   throw new Error("Already present BarCode ");
  // }

  const newProduct = await Product.create({
    name,
    user_id,
    stock,
    category,
    // barcode,
    price,
    image,
    des,
  });

  res.send(newProduct);
};

// Get All Products ====

export const getAllProducts = async (req, res) => {
  //

  // const { user_id } = req.params;
  // const user = await User.findById(user_id);
  // // find the user role ==

  // if (user.role !== "admin") {
  //   res.status(400).json("Only Admin Get The Products");
  // }

  // // get the all products

  const getAll = await Product.find();
  // .populate("user_id")
  // .sort({ createAt: -1 });
  res.send(getAll);
};

// get  One Products ===

export const getSingleProduct = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  // find the user role ==

  if (user.role !== "admin") {
    res.status(400).json("Only Admin Get The Products");
  }
  let getOne = await Product.findById(req.params.id);

  if (!getOne) {
    res.status(400);
    throw new Error("Invalid Product Id ");
  }
  res.send(getOne);
};

// Products Update =====

export const updateProducts = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  // find the user role ==

  if (user.role !== "admin") {
    res.status(400).json("Only Admin Get The Products");
  }

  let { product_id } = req.params;

  if (!product_id) {
    res.status(400);
    throw new Error("Invalid Product ID ");
  }

  let updateNewProduct = await Product.findByIdAndUpdate(product_id, req.body, {
    new: true,
  });

  res.send(updateNewProduct);
};

// delete products data ===

export const DeleteProduct = async (req, res) => {
  const { user_id } = req.params;
  const { product_id } = req.params;
  const user = await User.findById(user_id);
  // find the user role ==

  if (user.role !== "admin") {
    res.status(400).json("Only Admin Get The Products");
  }
  if (!product_id) {
    res.status(400);
    throw new Error("Invalid products ");
  }
  let deleteNewProducts = await Product.findByIdAndDelete(
    product_id,
    req.body,
    {
      new: true,
    },
  );
  res.send(deleteNewProducts).json("Succesfuly delete");
};
