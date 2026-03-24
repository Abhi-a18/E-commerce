import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { logout } from "../redux/authSlice";

function Navbar({ onSearch, darkMode, setDarkMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

  const [searchInput, setSearchInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="shadow-md py-3 border-b-2 border-gray-300 dark:border-gray-700"
      style={{ backgroundColor: darkMode ? "#1f1f1f" : "#ffffff" }}
    >
      {/* Top Row */}
      <div className="w-[95%] max-w-[1200px] mx-auto flex flex-row flex-nowrap items-center justify-between gap-2 overflow-hidden">
        
        {/* Logo */}
        <Link
          to="/home"
          className="flex-shrink-0 text-lg md:text-2xl font-bold text-[#cbe600]"
        >
          E-commerce
        </Link>

        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-[500px] relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/home");
            }}
            className={`w-full px-3 md:px-4 py-2 rounded-full outline-none text-sm md:text-base ${
              darkMode
                ? "bg-[#2c2c2c] text-white border border-gray-600"
                : "bg-white text-black border border-gray-300"
            }`}
          />
          <FaSearch
            onClick={() => navigate("/home")}
            className="absolute right-3 cursor-pointer text-blue-600"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          
          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded"
            style={{ backgroundColor: darkMode ? "#333" : "#e2e2e2" }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Profile */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold cursor-pointer text-sm">
              {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
            </div>

            {showProfile && (
              <div
                className="absolute top-10 right-0 px-3 py-2 rounded shadow-lg min-w-[150px] z-50"
                style={{
                  backgroundColor: darkMode ? "#2c2c2c" : "#ffffff",
                  color: darkMode ? "#fff" : "#000",
                }}
              >
                {user?.email || "No email"}
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-2 md:px-3 py-1 rounded text-xs md:text-sm hover:bg-red-600"
            style={{ backgroundColor: "#f44336", color: "white" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="flex justify-center gap-7 mt-3 text-sm md:text-base">
        {[
          { name: "Home", path: "/home" },
          { name: "Cart", path: "/cart" },
          { name: "Add Product", path: "/add-product" },
        ].map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`transition-colors duration-300 ${
              isActive(link.path)
                ? "text-red-500"
                : darkMode
                ? "text-white hover:text-red-500"
                : "text-black hover:text-red-500"
            }`}
          >
            {link.name}
            {link.name === "Cart" && cartItems.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;