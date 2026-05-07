import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    f_name: {
      type: String,
      required: [true, " First Name Is Required  "],
    },
    l_name: {
      type: String,
      required: [true, "Last Name Is required"],
    },
    email: {
      type: String,
      required: [true, " Email Is Required  "],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, " Password Is Required "],
    },
    role: {
      type: String,
      enum: ["admin", "cashier"],
      default: "cashier",
    },
    otp: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", UserSchema);
