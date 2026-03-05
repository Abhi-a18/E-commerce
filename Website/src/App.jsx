import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";

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
        <Route element={<ProtectedRoute />}>
          <Route
            path="/home"
            element={<Home searchTerm={searchItem} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

      </Routes>

    </>
  );
}

export default App;