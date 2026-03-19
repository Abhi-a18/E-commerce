import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) return null; // wait for auth restoration

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;