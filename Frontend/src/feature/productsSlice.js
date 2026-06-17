import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteProduct,
  getProduct,
  Product_post,
  updateProducts,
} from "./Product_servies";

const initialState = {
  product: [],
  productLoading: false,
  productMessage: "",
  productSuccess: false,
  productError: false,
};

// CREATE PRODUCT
export const productPost = createAsyncThunk(
  "product/post",
  async (productData, thunkAPI) => {
    try {
      return await Product_post(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

// UPDATE PRODUCT
export const updateProduct_Slice = createAsyncThunk(
  "product/update",
  async (productData, thunkAPI) => {
    try {
      return await updateProducts(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

// DELETE PRODUCT
export const deleteProduct_Slice = createAsyncThunk(
  "product/delete",
  async (productData, thunkAPI) => {
    try {
      return await deleteProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    productReset: (state) => {
      state.productLoading = false;
      state.productMessage = "";
      state.productSuccess = false;
      state.productError = false;
    },
  },

  extraReducers: (builder) => {
    // CREATE PRODUCT
    builder
      .addCase(productPost.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(productPost.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;
        state.productMessage = "Product Added Successfully";

        state.product.push(action.payload);
      })
      .addCase(productPost.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      });

    // GET PRODUCTS
    builder
      .addCase(getProduct_Slice.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getProduct_Slice.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct_Slice.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      });

    // UPDATE PRODUCT
    builder
      .addCase(updateProduct_Slice.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(updateProduct_Slice.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;

        state.product = state.product.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(updateProduct_Slice.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      });

    // DELETE PRODUCT
    builder
      .addCase(deleteProduct_Slice.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(deleteProduct_Slice.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;

        state.product = state.product.filter(
          (item) => item._id !== action.payload._id,
        );
      })
      .addCase(deleteProduct_Slice.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      });
  },
});

export const { productReset } = productSlice.actions;

export default productSlice.reducer;
