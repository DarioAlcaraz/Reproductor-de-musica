import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Cargar estado inicial desde localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setIsAuthenticated(storedAuth);
    setUser(storedUser || null);
  }, []);

  // ✅ Guardar usuario registrado
  const registerUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Validar login
  const login = ({ username, password }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) return false;

    if (
      storedUser.usuario === username &&
      storedUser.password === password
    ) {
      localStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      setUser(storedUser);
      return true;
    }

    return false;
  };

  // ✅ Logout completo
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};





