import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Navbar({ onSearch }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
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

       
        <div className="search-box" style={{ display: "flex", alignItems: "center" }}>
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

        <div className="nav-right">
          
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
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;