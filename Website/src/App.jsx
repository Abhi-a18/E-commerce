import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { restoreAuth } from "./redux/authSlice";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!authChecked) return;

    const publicPaths = ["/login", "/register"];

    if (!user && !publicPaths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [authChecked, user, location.pathname, navigate]);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const [searchTerm, setSearchTerm] = useState("");

  const hideNavbar = location.pathname === "/login" || !user;

  if (!authChecked) return <div>Loading...</div>;

  return (
    <div className="transition-colors duration-300">
      {!hideNavbar && (
        <Navbar
          onSearch={(value) => setSearchTerm(value)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      <Outlet context={{ searchTerm, darkMode }} />
    </div>
  );
}

export default App;