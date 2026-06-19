import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paymentPost } from "./paymentServies";

// 1. Async Thunk (API call)
export const postPayment = createAsyncThunk(
  "payment/postPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      return await paymentPost(paymentData);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || "Payment failed",
      );
    }
  },
);

// 2. Initial State
const initialState = {
  loading: false,
  payment: null,
  error: null,
  success: false,
};

// 3. Slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.payment = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(postPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      // Success
      .addCase(postPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
        state.success = true;
      })

      // Failed
      .addCase(postPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// 4. Export actions
export const { resetPaymentState } = paymentSlice.actions;

// 5. Export reducer
export default paymentSlice.reducer;
