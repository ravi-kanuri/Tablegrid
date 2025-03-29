import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/login", data);
    const token = res.data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    toast.success("Logged in successfully");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    return rejectWithValue(null);
  }
});

const initialState = {
  authUser: localStorage.getItem("token") || null,
  isLoggingIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.authUser = null;
      toast.success("Logged out successfully");
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload.token;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      });
  },
});

export const { logout,setAuthUser } = authSlice.actions;
export default authSlice.reducer;
