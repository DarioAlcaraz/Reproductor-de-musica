import { useSearchParams } from "react-router-dom";
import Canciones from "../Canciones";
import styles from "../app.module.css";
import { useFavoritos } from "../../context/FavoritosContext";

function Buscar() {
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("busqueda") || "";
  const { favoritos, setFavoritos } = useFavoritos();

  return (
    <main className={styles.main}>
      <h2 className={styles.titulo_favorito}>Resultados para: {busqueda}</h2>
      <Canciones key={busqueda} busqueda={busqueda} favoritos={favoritos} setFavoritos={setFavoritos} />
    </main>
  );
}

export default Buscar;







