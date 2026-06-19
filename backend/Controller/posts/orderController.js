import { Order } from "../../Models/posts/OrderScehema.js";
import { Product } from "./../../Models/posts/ProductsSchema.js";

//

// create the  order  post  order  section  ======

export const createOrder = async (req, res) => {
  const { product_id, user_id } = req.params;
  const {
    paymentMethod,
    customerName,

    quantity,
    phoneNumber,
    address,
  } = req.body;

  if (!quantity || !customerName || !phoneNumber) {
    res.status(400);
    throw new Error("Enter The Fields");
  }
  // fehly   product ki  id  ko le awao

  const product = await Product.findById(product_id);

  if (product.stock < quantity) {
    res.status(400);
    throw new Error("low  stock");
  }

  product.stock = product.stock - quantity;
  await product.save();
  // products ke price aur order ki price  dono metch karo

  const price = product.price;

  const totalPrice = price * quantity;

  const newCreateOrder = await Order.create({
    paymentMethod,
    customerName,

    product_id,
    user_id,
    totalPrice,
    phoneNumber,
    price,
    address,
    quantity,
  });

  res.send(newCreateOrder);
};

//
// ======   get the order ==== ==

export const getOrder = async (req, res) => {
  const getAllOrder = await Order.find()
    .populate({
      path: "product_id",
      populate: {
        path: "user_id",
      },
    })
    .sort({ createdAt: -1 });

  res.send(getAllOrder);
};

// cancel The Order ====

export const cancelOrder = async (req, res) => {
  const { order_id } = req.params;

  // find the   order id
  const order = await Order.findById(order_id);

  if (!order) {
    res.status(404).json("Order is Not Found ");
  }

  ///  order main product is mawojood hain  ase tara esly nekal na hian sam product agay
  //  kis product ki order cenel krna hain
  const product = await Product.findById(order.product_id);

  product.stock = product.stock + order.quantity;
  await product.save();

  order.status = "cancelled";

  await order.save();

  res.send("order cancel successfully");
};
