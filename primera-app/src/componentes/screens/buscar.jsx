import { useSearchParams } from "react-router-dom";
import Canciones from "../canciones/Canciones";
import styles from "./buscar.module.css";
import { useFavoritos } from "../../context/FavoritosContext";

function Buscar() {
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("busqueda") || "";

  const {
    favoritos,
    toggleFavorito,
    removeFavorito,
  } = useFavoritos();

  return (
    <main className={styles.main}>
      <h2 className={styles.titulo_favorito}>Resultados para: {busqueda}</h2>

      <Canciones
        key={busqueda}
        busqueda={busqueda}
        favoritos={favoritos}
        onToggleFavorite={toggleFavorito}
        onRemoveFavorite={removeFavorito}
      />
    </main>
  );
}

export default Buscar;








