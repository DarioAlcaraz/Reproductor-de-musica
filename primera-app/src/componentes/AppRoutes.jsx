import { Routes, Route } from "react-router-dom";

import Home from "./screens/home";
import Buscar from "./screens/buscar";
import Usuario from "./usuario/Usuario";
import Login from "./Login/Login";
import Registrarse from "./registro/Registrarse";

import { PrivateRoute } from "./PrivateRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* ✅ Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrarse" element={<Registrarse />} />

      {/* ✅ Rutas privadas (solo si está autenticado) */}
      <Route
        path="/usuario"
        element={
          <PrivateRoute>
            <Usuario />
          </PrivateRoute>
        }
      />

      <Route
        path="/buscar"
        element={
          <PrivateRoute>
            <Buscar />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;

