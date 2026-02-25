import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-top">
        <Link to="/home" className="logo">
          E-commerce
        </Link>

        <div className="search-box">
          <input type="text" placeholder="Search products..." />
          <FaSearch />
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <div className="profile-circle">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/">
              <button className="btn">Login</button>
            </Link>
          )}
        </div>
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/cart" >
  Cart
</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;