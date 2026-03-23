// src/api/authApi.js
import axios from "axios";

export const loginUserApi = async (userData) => {
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
};