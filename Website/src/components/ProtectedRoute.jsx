import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    alert("Please Signup or Login First");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;