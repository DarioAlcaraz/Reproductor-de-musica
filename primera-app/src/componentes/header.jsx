import styles from "./header.module.css";
import { User, Settings, House, LibraryBig, Layers, } from 'lucide-react';

function Header () {
  return (
    <header>
      <div className={styles.brand}>
        <img src="/area_music.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Area Music</h1>
      </div>
      
      
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navlink}>
            <House size={20} />
            <span>Inicio</span>
          </a>
          <a href="#" className={styles.navlink}>
            <LibraryBig size={20} />
            <span>Biblioteca</span>
          </a>
          <a href="#" className={styles.navlink}>
            <Layers size={20} />
            <span>Categorías</span>
          </a>
        </div>


        <div className={styles.userIcon}>
          <a href="#" className={styles.iconLink} aria-label="Usuario">
            <User color= "blue" size={24} />
          </a>
          <a href="#" className={styles.iconLink} aria-label="Usuario">
            <Settings color= "blue" size={24} />
          </a>
        </div>
      </nav>

    </header>
        
  );
}

export default Header;

