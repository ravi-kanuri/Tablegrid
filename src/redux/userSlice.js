import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

// Helper function to get users from localStorage
const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

// Helper function to save users to localStorage
const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/users?page=${page}`);
    saveUsersToLocalStorage(response.data.data);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch users");
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

// Update a user
export const updateUser = createAsyncThunk("users/updateUser", async ({ id, userData }, { rejectWithValue, getState }) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    const updatedUser = response.data;
    
    const users = getState().user.users.map(user => user.id === id ? updatedUser : user);
    saveUsersToLocalStorage(users);
    
    toast.success("User updated successfully!");
    return updatedUser;
  } catch (error) {
    toast.error("Failed to update user");
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

// Delete a user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue, getState }) => {
  try {
    await axiosInstance.delete(`/users/${id}`);
    const users = getState().user.users.filter(user => user.id !== id);
    saveUsersToLocalStorage(users);
    
    toast.success("User deleted successfully!");
    return id;
  } catch (error) {
    toast.error("Failed to delete user");
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: getUsersFromLocalStorage(),
    loading: false,
    error: null,
    currentPage: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = userSlice.actions;
export default userSlice.reducer;
