  import { Link, useNavigate } from "react-router-dom";
  import { useSelector, useDispatch } from "react-redux";
  import { useState, useEffect } from "react";
  import { FaSearch, FaMoon, FaSun } from "react-icons/fa";

  function Navbar({ onSearch }) {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");


    const [darkMode, setDarkMode] = useState(
      localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
      if (darkMode) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }, [darkMode]);   

    const handleLogout = () => {
      alert("logged out successfully");
      
      navigate("/");
    };

    const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const triggerSearch = () => {
      if (onSearch) {
        onSearch(searchTerm);
      }
      navigate("/home");
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        triggerSearch();
      }
    };

    return (
      <nav className="navbar">
        <div className="container navbar-top">
          <Link to="/home" className="logo">
            E-commerce
          </Link>

          <div
            className="search-box"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <FaSearch
              style={{ cursor: "pointer", marginLeft: "8px" }}
              onClick={triggerSearch}
            />
          </div>

          <div className="nav-right" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            
    
            <button
              className="btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

      
            <div className="profile-circle">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/add-product">Add Product</Link>
        </div>
      </nav>
    );
  }

  export default Navbar;