import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllUsers, LoginUser, RegisterUser } from "./UserServies";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  userLoading: false,
  userError: false,
  userMessage: "",
  userSuccess: false,
};

export const reg_Slice = createAsyncThunk(
  "register",
  async (userData, ThunkAPI) => {
    try {
      return await RegisterUser(userData);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response?.data?.error);
    }
  },
);

export const login_Slice = createAsyncThunk(
  "login",
  async (userData, ThunkAPI) => {
    try {
      return await LoginUser(userData);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response?.data?.error);
    }
  },
);

export const getUser_Slice = createAsyncThunk(
  "get-user",
  async (_, ThunkAPI) => {
    try {
      return await GetAllUsers();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response?.data?.error);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.userLoading = false;
      state.userSuccess = false;
      state.userError = false;
      state.user = null;
      state.userMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Cases
      .addCase(reg_Slice.pending, (state) => {
        state.userLoading = true;
        state.userError = false;
        state.userSuccess = false;
      })
      .addCase(reg_Slice.rejected, (state, action) => {
        state.userLoading = false;
        state.userMessage = action.payload;
        state.userError = true;
        state.userSuccess = false;
      })
      .addCase(reg_Slice.fulfilled, (state, action) => {
        state.userSuccess = true;
        state.user = action.payload;
        // state.userMessage = action.payload;
        state.userError = false;
        state.userLoading = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // Login Cases
      .addCase(login_Slice.pending, (state) => {
        state.userLoading = true;
        state.userError = false;
        state.userSuccess = false;
      })
      .addCase(login_Slice.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
        state.userSuccess = false;
      })
      .addCase(login_Slice.fulfilled, (state, action) => {
        state.userSuccess = true;
        state.user = action.payload;
        // state.userMessage = a;
        state.userError = false;
        state.userLoading = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // Get Users Cases
      .addCase(getUser_Slice.pending, (state) => {
        state.userLoading = true;
        state.userError = false;
      })
      .addCase(getUser_Slice.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(getUser_Slice.fulfilled, (state, action) => {
        state.userSuccess = true;
        // state.userMessage = action.payload;
        state.userError = false;
        state.userLoading = false;
      });
  },
});

export default userSlice.reducer;

export const { userReset } = userSlice.actions;
