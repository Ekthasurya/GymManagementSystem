import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getStoredUser,
  saveAuthData,
} from "../services/authService";

export const AuthContext =
  createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =
    useState(true);

  // Check saved login
  useEffect(() => {
    const storedUser =
      getStoredUser();

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  // Login
  const login = async (credentials) => {
    const data =
      await loginUser(credentials);

    saveAuthData(data);

    setUser(data.user);

    return data;
  };

  // Register
  const register = async (userData) => {
    const data =
      await registerUser(userData);

    return data;
  };

  // Logout
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};