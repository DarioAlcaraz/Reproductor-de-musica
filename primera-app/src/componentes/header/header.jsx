import styles from "./header.module.css";
import { User, House, SearchCheck, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const [searchBusqueda, setSearchBusqueda] = useState("");

  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleSearch = () => {
    if (searchBusqueda.trim()) {
      navigate(`/buscar?busqueda=${encodeURIComponent(searchBusqueda.trim())}`);
      setSearchBusqueda("");
    }
  };

  const handleLogout = () => {
    logout(); // ✅ limpia auth + user desde el contexto
    navigate("/login"); // ✅ redirige
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img
          src="/area_music.png"
          alt="Logo Area Music"
          className={styles.logo}
        />
        <h1 className={styles.title}>Area Music</h1>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navlink}>
            <House size={20} />
            <span>Inicio</span>
          </Link>

          <Link to="/usuario" className={styles.navlink}>
            <User size={20} />
            <span>Usuario</span>
          </Link>

          {/* ✅ Solo mostramos Buscar si está autenticado */}
          {isAuthenticated && (
            <Link to="/buscar" className={styles.navlink}>
              <SearchCheck size={20} />
              <span>Buscar</span>
            </Link>
          )}
        </div>

        {/* ✅ Barra de búsqueda solo si está autenticado */}
        {isAuthenticated && (
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar artista..."
              value={searchBusqueda}
              onChange={(e) => setSearchBusqueda(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={styles.searchInput}
              aria-label="Buscar artista"
            />
            <button
              type="button"
              onClick={handleSearch}
              className={styles.searchButton}
            >
              <Search className={styles.SearchIcono} size={17} />
            </button>
          </div>
        )}

        {/* ✅ Si NO está autenticado → mostrar botón Registrarse */}
        {!isAuthenticated && (
          <button
            type="button"
            className={styles.registrarse}
            onClick={() => navigate("/registrarse")}
          >
            Registrarse
          </button>
        )}

        {/* ✅ Si está autenticado → mostrar nombre + botón Cerrar sesión */}
        {isAuthenticated && (
          <div className={styles.userSection}>
            <span className={styles.userName}>
              Hola, {user?.usuario || "Usuario"}
            </span>

            <button
              type="button"
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;

