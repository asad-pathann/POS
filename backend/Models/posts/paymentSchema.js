import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    // kis order ki payment dena hian

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    //   kinta amount hain  ==
    amount: {
      type: Number,
      required: true,
    },

    //   kis tara dena hain cash ya  card  online

    method: {
      type: String,
      enum: ["online", "cash", "card"],
      default: "cash",
    },

    //   pese  aye ya nahi

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  {
    // kis time bana ye
    timestamps: true,
  },
);

export const Payment = mongoose.model("Payment", paymentSchema);
