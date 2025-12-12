import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Styles from "./registrarse.module.css";

const Registrarse = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // ✅ Guardar usuario
    registerUser({
      usuario: formData.usuario,
      correo: formData.correo,
      password: formData.password,
    });

    alert("Registro exitoso. Ahora inicia sesión.");
    navigate("/login");
  };

  return (
    <div className={Styles.contenedor}>
      <div className={Styles.registro}>
        <h1 className={Styles.title}>Registro</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Escribe tu Usuario..."
            required
            value={formData.usuario}
            onChange={(e) =>
              setFormData({ ...formData, usuario: e.target.value })
            }
          />
          <h6 className={Styles.h6title}>Usuario</h6>

          <input
            type="email"
            placeholder="Escribe tu Correo..."
            required
            value={formData.correo}
            onChange={(e) =>
              setFormData({ ...formData, correo: e.target.value })
            }
          />
          <h6 className={Styles.h6title}>Correo</h6>

          <input
            type="password"
            placeholder="Escribe tu Contraseña..."
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <h6 className={Styles.h6title}>Contraseña</h6>

          <input
            type="password"
            placeholder="Confirma tu Contraseña..."
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <h6 className={Styles.h6title}>Confirmar Contraseña</h6>

          <button type="submit" className={Styles.boton}>
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;


