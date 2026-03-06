import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {

    login: (state, action) => {
      state.user = action.payload;


      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

   
    logout: (state) => {
      state.user = null;

      
      localStorage.removeItem("user");
    }

  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;