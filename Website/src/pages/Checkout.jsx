import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  // ✅ read same key used in Navbar
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // ✅ sync with Navbar changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    address: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const convertToINR = (usd) => {
    return (usd * 83).toFixed(2);
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert(`Order placed successfully! Total: ₹${convertToINR(totalAmount)}`);
    dispatch(clearCart());
    navigate("/home");
  };

  return (
    <div
      style={{
        //  minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
       
      }}
    >
      <div
        style={{
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
          backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 className="text-center mb-4">Checkout</h2>

        <h3
          className="text-center mb-4"
          style={{ color: darkMode ? "#fff" : "#00c44b" }}
        >
          Order Summary
        </h3>

        {cartItems.map((item) => (
          <p key={item.id} className="text-center mb-1">
            {item.title} × {item.quantity} = ₹
            {convertToINR(
              Number(item.price) * Number(item.quantity)
            )}
          </p>
        ))}

        <h3 className="text-center mb-6">
          Total: ₹{convertToINR(totalAmount)}
        </h3>

        <h3 className="text-center mb-4">Shipping Details</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyle(darkMode)}
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle(darkMode)}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ ...inputStyle(darkMode), minHeight: "100px" }}
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={inputStyle(darkMode)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#00c44b",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              marginTop: "10px",
            }}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = (darkMode) => ({
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: darkMode ? "#2c2c2c" : "#fff",
  color: darkMode ? "#fff" : "#000",
});

export default Checkout;