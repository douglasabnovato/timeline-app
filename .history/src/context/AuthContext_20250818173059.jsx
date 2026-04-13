import { createContext, useContext, useState, useEffect } from "react";
import { storageService } from "../utils/storageService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const adminUser = {
    id: 1,
    name: "Administrador",
    email: "douglasabnovato.developer@gmail.com",
    password: "developer123",
    role: "admin"
  };

  useEffect(() => {
    const users = storageService.get("users") || [];
    if (!users.find((u) => u.role === "admin")) {
      storageService.set("users", [adminUser, ...users]);
    }

    const user = storageService.get("currentUser");
    if (user) setCurrentUser(user);
  }, []);

  const login = (user) => {
    storageService.set("currentUser", user);
    setCurrentUser(user);
  };

  const logout = () => {
    storageService.remove("currentUser");
    setCurrentUser(null);
  };

  const register = (newUser) => {
    const users = storageService.get("users") || [];
    if (users.find((u) => u.email === newUser.email)) {
      alert("Email já cadastrado!");
      return;
    }

    storageService.pushToArray("users", newUser);
    login(newUser);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
