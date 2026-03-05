import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

  const user = useSelector((state) => state.auth?.user);

  // If user not logged in redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;