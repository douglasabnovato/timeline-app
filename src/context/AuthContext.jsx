import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { setItem, getItem, removeItem } from "../utils/storageService";

const AuthContext = createContext();
const API_URL = "http://localhost:3001/users";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getItem("currentUser"));

  // Registro de usuário
  const register = async (userData) => {
    // verificar se email já existe
    const res = await axios.get(`${API_URL}?email=${userData.email}`);
    if (res.data.length > 0) {
      throw new Error("Usuário já registrado com esse e-mail.");
    }

    const newUser = { id: Date.now(), ...userData };
    await axios.post(API_URL, newUser);
    setCurrentUser(newUser);
    setItem("currentUser", newUser);
  };

  // Login
  const login = async (email, password) => {
    const res = await axios.get(`${API_URL}?email=${email}&password=${password}`);
    if (res.data.length === 0) {
      throw new Error("Credenciais inválidas");
    }
    const user = res.data[0];
    setCurrentUser(user);
    setItem("currentUser", user);
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
