import styles from "./header.module.css";
import { User, Settings, House, SearchCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [searchBusqueda, setSearchBusqueda] = useState("");

  const handleSearch = () => {
    if (searchBusqueda.trim()) {
      navigate(`/buscar?busqueda=${encodeURIComponent(searchBusqueda.trim())}`);
      setSearchBusqueda("");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img src="/area_music.png" alt="Logo Area Music" className={styles.logo} />
        <h1 className={styles.title}>Area Music</h1>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navlink}>
            <House size={20} />
            <span>Inicio</span>
          </Link>
          <Link to="/buscar" className={styles.navlink}>
            <SearchCheck size={20} />
            <span>Buscar</span>
          </Link>
        </div>

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
            🔍
          </button>
        </div>

        <div className={styles.userIcon}>
          <User className={styles.user} size={24} />
          <Settings className={styles.setting} size={24} />
        </div>
      </nav>
    </header>
  );
}

export default Header;


