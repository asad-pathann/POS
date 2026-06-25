import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Product_post,
  getProduct,
  updateProducts,
  deleteProduct,
} from "./Product_servies";

// CREATE PRODUCT
export const productPost = createAsyncThunk(
  "product/create",
  async (productData, thunkAPI) => {
    try {
      const res = await Product_post(productData);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// GET PRODUCTS
export const getProduct_Slice = createAsyncThunk(
  "product/get",
  async (_, thunkAPI) => {
    try {
      return await getProduct();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// UPDATE
export const updateProduct_Slice = createAsyncThunk(
  "product/update",
  async (data, thunkAPI) => {
    try {
      return await updateProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// DELETE
export const deleteProduct_Slice = createAsyncThunk(
  "product/delete",
  async (data, thunkAPI) => {
    try {
      await deleteProduct(data);
      return { _id: data.product_id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    productLoading: false,
    productSuccess: false,
    productError: false,
    productMessage: "",
  },

  reducers: {
    productReset: (state) => {
      state.productLoading = false;
      state.productSuccess = false;
      state.productError = false;
      state.productMessage = "";
    },
  },

  extraReducers: (builder) => {
    // CREATE
    builder
      .addCase(productPost.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(productPost.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;

        state.product.push(action.payload); // ✅ safe
      })
      .addCase(productPost.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      });

    // GET
    builder.addCase(getProduct_Slice.fulfilled, (state, action) => {
      state.product = action.payload;
    });

    // UPDATE
    builder.addCase(updateProduct_Slice.fulfilled, (state, action) => {
      state.product = state.product.map((item) =>
        item._id === action.payload._id ? action.payload : item,
      );
    });

    // DELETE
    builder.addCase(deleteProduct_Slice.fulfilled, (state, action) => {
      state.product = state.product.filter(
        (item) => item._id !== action.payload._id,
      );
    });
  },
});

export const { productReset } = productSlice.actions;
export default productSlice.reducer;
