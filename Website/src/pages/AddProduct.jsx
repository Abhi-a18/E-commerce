import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/ProductSlice";
import { useNavigate, useOutletContext } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { darkMode } = useOutletContext();

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
      rating: 4,
    };

    dispatch(addProduct(newProduct));
    navigate("/home");
  };

  return (
    <div
      className="flex justify-center items-start min-h-screen px-3 sm:px-4 pt-4 sm:pt-6 transition-colors duration-300"
      style={{ backgroundColor: darkMode ? "#222" : "#f5f7fa" }}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-[650px] p-4 sm:p-6 rounded-lg shadow flex flex-col gap-3 sm:gap-4 border transition ${
          darkMode
            ? "bg-[#1f1f1f] border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-center">
          Add Product
        </h2>

        {/* Product Name */}
        <input
          placeholder="Product Name"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={`p-2 text-sm sm:text-base rounded border ${
            darkMode
              ? "bg-[#2c2c2c] border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />

        {/* Price + Category */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            placeholder="Price"
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={`flex-1 p-2 text-sm sm:text-base rounded border ${
              darkMode
                ? "bg-[#2c2c2c] border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />

          <input
            placeholder="Category"
            required
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={`flex-1 p-2 text-sm sm:text-base rounded border ${
              darkMode
                ? "bg-[#2c2c2c] border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          required
          rows="3"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className={`p-2 text-sm sm:text-base rounded border ${
            darkMode
              ? "bg-[#2c2c2c] border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />

        {/* Image URL */}
        <input
          placeholder="Image URL"
          required
          onChange={(e) =>
            setForm({ ...form, thumbnail: e.target.value })
          }
          className={`p-2 text-sm sm:text-base rounded border ${
            darkMode
              ? "bg-[#2c2c2c] border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />

        {/* Button */}
        <button
          className="w-full py-2 rounded text-sm sm:text-base text-white bg-[#3600e6] hover:bg-green-500 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;