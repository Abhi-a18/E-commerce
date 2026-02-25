import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div className="container home-container">
      <h2 className="home-title">Our Products</h2>

      <div className="product-grid">
        {products.map((item) => {
          const added = isInCart(item.id);

          return (
            <div
              key={item.id}
              className={`product-card ${added ? "added-card" : ""}`}
            >
              <img src={item.thumbnail} alt={item.title} />
              <h4>{item.title}</h4>
              <p>${item.price}</p>

              <button
                className={`btn ${added ? "added-btn" : ""}`}
                onClick={() => dispatch(addToCart(item))}
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