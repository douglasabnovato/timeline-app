import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Usuário admin fixo (alterar email e senha aqui)
  const adminUser = {
    id: 1,
    name: "Administrador",
    email: "douglasabnovato.developer@gmail.com",
    password: "developer123",
    role: "admin"
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.find((u) => u.role === "admin")) {
      localStorage.setItem("users", JSON.stringify([adminUser, ...users]));
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  const login = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    login(newUser);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
