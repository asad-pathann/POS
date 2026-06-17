import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/UserSlice";
import productSlice from "./../feature/productsSlice";
import { OrderSlice } from "../feature/orderSlice";
export const store = configureStore({
  reducer: {
    auth: userSlice,
    products: productSlice,
    order: OrderSlice,
  },
});
