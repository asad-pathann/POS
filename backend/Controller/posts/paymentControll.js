import { Order } from "../../Models/posts/OrderScehema.js";
import { Payment } from "../../Models/posts/paymentSchema.js";

export const createPayment = async (req, res) => {
  // order is ID
  const { order_id } = req.params;

  const { method, status, amount } = req.body;

  if (!method) {
    res.status(400);
    throw new Error("Enter The Value ");
  }

  const order = await Order.findById(order_id);

  if (!order) {
    res.status(400);
    throw new Error("Order empty!");
  }

  const payment = await Payment.create({
    method,
    status,
    order_id,
    amount: order.totalPrice,
  });

  res.send(payment);
};
