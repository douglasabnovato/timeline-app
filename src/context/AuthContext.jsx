import { createContext, useContext, useEffect, useState } from "react";
import { storageService } from "../utils/storageService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = storageService.get("currentUser");
    if (user) setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    storageService.set("currentUser", user);
  };

  const logout = () => {
    setCurrentUser(null);
    storageService.remove("currentUser");
  };

  const register = (user) => {
    setCurrentUser(user);
    storageService.set("currentUser", user);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
