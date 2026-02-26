import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [ratings, setRatings] = useState({});
  const [quantities, setQuantities] = useState({});

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const convertToINR = (usd) => {
    const rate = 83;
    return (usd * rate).toLocaleString("en-IN");
  };

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);

      const uniqueCategories = [
        "all",
        ...new Set(res.data.products.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);

      const initialQty = {};
      res.data.products.forEach((item) => {
        initialQty[item.id] = 1;
      });
      setQuantities(initialQty);
    });
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (sortOrder === "low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, selectedCategory, sortOrder, products]);

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleRating = (productId, value) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const renderStars = (productId, apiRating) => {
    const currentRating = ratings[productId] || Math.round(apiRating);

    return (
      <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "18px",
              color: star <= currentRating ? "gold" : "#ccc",
            }}
            onClick={() => handleRating(productId, star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container home-container">
      <h2 className="home-title">Products</h2>

      <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              margin: "5px",
              padding: "6px 12px",
              background: selectedCategory === cat ? "#000" : "#eee",
              color: selectedCategory === cat ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((item) => {
          const added = isInCart(item.id);
          const quantity = quantities[item.id] || 1;

          return (
            <div key={item.id} className="product-card">
              <img src={item.thumbnail} alt={item.title} />
              <h4>{item.title}</h4>
              <p>₹{convertToINR(item.price)}</p>

              {renderStars(item.id, item.rating)}

              <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "10px 0" }}>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button
                className="btn"
                onClick={() =>
                  dispatch(addToCart({ ...item, quantity }))
                }
              >
                {added ? "Added ✓" : "Add To Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;