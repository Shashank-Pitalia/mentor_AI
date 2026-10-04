import { createContext, useEffect, useState } from "react";
import {
  login as loginApi,
  register as registerApi,
  googleLogin as googleLoginApi,
  getMe,
} from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Logged in user
  const [user, setUser] = useState(null);

  // Show loader while checking authentication
  const [loading, setLoading] = useState(true);

  // Check authentication when app starts
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;