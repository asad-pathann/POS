import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, getCategories } from "./categoryServies";

// CREATE CATEGORY
export const addCategory = createAsyncThunk(
  "category/add",
  async (data, thunkAPI) => {
    try {
      return await createCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// GET CATEGORY
export const fetchCategories = createAsyncThunk(
  "category/get",
  async (_, thunkAPI) => {
    try {
      return await getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default categorySlice.reducer;
