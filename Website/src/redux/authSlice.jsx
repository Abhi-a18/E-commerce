import { createSlice } from "@reduxjs/toolkit";

const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  users: storedUsers,
  user: storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { email, password } = action.payload;

      const existingUser = state.users.find(
        (u) => u.email === email
      );

      if (!existingUser) {
        state.users.push({ email, password });
    
        localStorage.setItem(
          "users",
          JSON.stringify(state.users)
        );
      }
    },

    login: (state, action) => {
      const { email, password } = action.payload;

      const validUser = state.users.find(
        (u) =>
          u.email === email &&
          u.password === password
      );

      if (validUser) {
        state.user = validUser;

        localStorage.setItem(
          "user",
          JSON.stringify(validUser)
        );
      }
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;