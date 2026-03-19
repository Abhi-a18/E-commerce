import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load auth state from localStorage on startup
const storedAuth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: userData.username,
          password: userData.password,
          expiresInMins: 30,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Login failed" });
    }
  }
);

const initialState = {
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
  loading: false,
  error: null,
  authChecked: false, // ✅ new flag to indicate auth restoration
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
    restoreAuth: (state) => {
      const stored = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : null;
      if (stored) {
        state.user = stored.user;
        state.token = stored.token;
      }
      state.authChecked = true; // ✅ mark restoration done
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
        };
        state.token = action.payload.accessToken;
        state.authChecked = true;
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: state.user, token: state.token })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;