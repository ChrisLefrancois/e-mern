import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { token } = useAuth(); // Destructure the token correctly
  if (!token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
