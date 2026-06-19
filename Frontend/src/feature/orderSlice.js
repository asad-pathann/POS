import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderPost, getOrders } from "./orderServies";

const initialState = {
  order: [],
  orders: [],
  orderLoading: false,
  orderSuccess: false,
  orderMessage: "",
  orderError: false,
};

// Add Order
export const order_slice = createAsyncThunk(
  "order/create",
  async (orderData, thunkAPI) => {
    try {
      return await orderPost(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

// Get Orders
export const get_order_slice = createAsyncThunk(
  "order/get",
  async (_, thunkAPI) => {
    try {
      return await getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

export const OrderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    resetOrder: (state) => {
      state.orderLoading = false;
      state.orderSuccess = false;
      state.orderError = false;
      state.orderMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE ORDER
      .addCase(order_slice.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(order_slice.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderSuccess = true;
        state.order = action.payload;
      })
      .addCase(order_slice.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = true;
        state.orderMessage = action.payload;
      })

      // GET ORDERS
      .addCase(get_order_slice.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(get_order_slice.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderSuccess = true;
        state.order = action.payload;
      })
      .addCase(get_order_slice.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = true;
        state.orderMessage = action.payload;
      });
  },
});

export const { resetOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
