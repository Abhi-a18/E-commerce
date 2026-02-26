import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const [searchItem, setSearchItem] = useState("");

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
  
      {!hideNavbar && user && (
        <Navbar onSearch={setSearchItem} />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
          
          <Route element={<ProtectedRoute />}>
  <Route
    path="/home"
    element={<Home searchTerm={searchItem} />}
  />
  <Route path="/cart" element={<Cart />} />
</Route>
      </Routes>
    </>
  );
}

export default App;