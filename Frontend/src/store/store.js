import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/UserSlice";
import productSlice from "./../feature/productsSlice";
import OrderSlice from "../feature/orderSlice";
import paymentSlice from "./../feature/paymentSlice";
import categorySlice from "./../feature/categorySlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    products: productSlice,
    orders: OrderSlice,
    payments: paymentSlice,
    category: categorySlice,
  },
});
