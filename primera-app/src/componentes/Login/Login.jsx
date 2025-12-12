import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./Login.module.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Completa todos los campos");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const success = login({ username, password });

    if (!success) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    navigate("/home");
  };

  return (
    <div className={Styles.contenedor}>
      <div className={Styles.login}>
        <h1 className={Styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={Styles.subcontenedor}>
          <input
            type="text"
            placeholder="Escribe tu Usuario..."
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h6 className={Styles.h6title}>Usuario</h6>

          <input
            type="password"
            placeholder="Escribe tu Contraseña..."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h6 className={Styles.h6title}>Contraseña</h6>

          <button type="submit" className={Styles.boton}>
            Ingresar
          </button>

          <Link to="/registrarse" className={Styles.link}>
            Registrarme
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;


