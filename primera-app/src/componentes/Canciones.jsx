import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "../api";
import ProductList from "./product-list";
import ProductCard from "./product-card";
import styles from "./canciones.module.css";

function Canciones({ busqueda = "la barra", favoritos, setFavoritos }) {
  const [searchBusqueda, setSearchBusqueda] = useState(busqueda);

  const { data, isLoading, error } = useQuery({
    queryKey: ["itunes", searchBusqueda],
    queryFn: () => fetchSongs(searchBusqueda),
    enabled: !!searchBusqueda,
  });

  return (
    <div className={styles.canciones}>
      {isLoading && <p>Cargando canciones...</p>}
      {error && <p>Error al buscar canciones: {error.message}</p>}
      {data && data.results && data.results.length > 0 ? (
        <ProductList>
          {data.results.map((cancion) => (
            <ProductCard
              key={cancion.trackId}
              title={cancion.trackName}
              album={cancion.collectionName}
              image={cancion.artworkUrl100}
              previewUrl={cancion.previewUrl}
              category={cancion.primaryGenreName}
              isFavorite={favoritos.includes(cancion.trackId)}
              onToggleFavorite={() => {
                if (favoritos.includes(cancion.trackId)) {
                  setFavoritos(favoritos.filter((id) => id !== cancion.trackId));
                } else {
                  setFavoritos([...favoritos, cancion.trackId]);
                }
              }}
            />
          ))}
        </ProductList>
      ) : (
        !isLoading && <p>No se encontraron canciones para "{searchBusqueda}".</p>
      )}
    </div>
  );
}

export default Canciones;
