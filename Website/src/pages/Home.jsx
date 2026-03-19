import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import { setProducts } from "../redux/ProductSlice";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const cartItems = useSelector((state) => state.cart.items);

  const { searchTerm, darkMode } = useOutletContext();

  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    if (products.length === 0) {
      axios.get("https://dummyjson.com/products").then((res) => {
        dispatch(setProducts(res.data.products));
      });
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const cats = ["all", ...new Set(products.map((p) => p.category))];
    setCategories(cats);
  }, [products]);

  useEffect(() => {
    let temp = [...products];

    if (searchTerm)
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (selectedCategory !== "all")
      temp = temp.filter((p) => p.category === selectedCategory);

    if (sortOrder === "low") temp.sort((a, b) => a.price - b.price);
    if (sortOrder === "high") temp.sort((a, b) => b.price - a.price);

    setFiltered(temp);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  const indexOfLast = currentPage * productsPerPage;
  const currentProducts = filtered.slice(
    indexOfLast - productsPerPage,
    indexOfLast
  );
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const convertToINR = (usd) => (usd * 83).toLocaleString("en-IN");

  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return "★".repeat(fullStars) + "☆".repeat(emptyStars);
  };

  return (
    <div className={`${darkMode ? "bg-[#222]" : "bg-[#f5f7fa]"} min-h-screen`}>
      <div className="w-[95%] max-w-[1200px] mx-auto py-6">

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-red-600 mb-6">
          Products
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded text-xs capitalize ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-200 dark:bg-[#2c2c2c] dark:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`p-2 rounded text-sm ${
              darkMode ? "bg-[#2c2c2c] text-white" : "bg-white"
            }`}
          >
            <option value="">Sort By Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {currentProducts.map((item) => {
            const cartItem = cartItems.find((i) => i.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 1;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#2c2c2c] p-3 rounded-lg shadow flex flex-col"
              >
                <div className="h-40 flex items-center justify-center bg-gray-100 rounded">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </div>

                <h4 className="mt-2 text-sm font-semibold text-black dark:text-white line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-yellow-400 text-sm">
                  {getStars(item.rating)}
                </p>

                <p className="text-red-600 font-bold text-sm">
                  ₹{convertToINR(item.price)}
                </p>

                {cartItem && (
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="bg-green-500 text-white px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  onClick={() =>
                    dispatch(addToCart({ ...item, quantity }))
                  }
                  className={`mt-2 py-1 rounded text-xs ${
                    cartItem
                      ? "bg-green-500 text-white"
                      : "bg-[#3600e6] text-white"
                  }`}
                >
                  {cartItem ? "Added ✓" : "Add To Cart"}
                </button>
              </div>
            );
          })}
        </div>

        {/* ✅ Smart Pagination */}
        <div className="flex justify-center gap-2 mt-6">

          {/* Previous Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded text-sm"
          >
            ←
          </button>

          {/* Previous Page */}
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-300 rounded text-sm"
            >
              {currentPage - 1}
            </button>
          )}

          {/* Current Page */}
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
            {currentPage}
          </button>

          {/* Next Page */}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-300 rounded text-sm"
            >
              {currentPage + 1}
            </button>
          )}

          {/* Next Arrow */}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded text-sm"
          >
            →
          </button>

        </div>
      </div>
    </div>
  );
}

export default Home;