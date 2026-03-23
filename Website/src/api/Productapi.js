// src/api/productApi.js
import axios from "axios";

// Fetch all products
export const fetchProductsApi = async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data.products;
};
