import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch("api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("jwtToken", res.token);
        navigate("/admin");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

    // On component mount, check if there's a token in localStorage
    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        // Assuming your API sends back user data after successful login
        setUser({ token });
      }
    }, []);

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
