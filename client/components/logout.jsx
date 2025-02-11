import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logOut(); // Calls the logOut function to clear user data
    navigate("/login"); // Redirect to the login page
  }, [logOut, navigate]);

  return <div>Logging out...</div>; // You can customize this message or add a loading spinner
};

export default Logout;
