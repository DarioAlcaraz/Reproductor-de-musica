import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "../../api";
import ProductList from "../productList/product-list";
import ProductCard from "../productCard/product-card";
import styles from "./canciones.module.css";

function Canciones({ busqueda = "la barra", favoritos, onToggleFavorite }) {
  const [searchBusqueda] = useState(busqueda);

  const { data, isLoading, error } = useQuery({
    queryKey: ["itunes", searchBusqueda],
    queryFn: () => fetchSongs(searchBusqueda),
    enabled: !!searchBusqueda,
  });

  if (isLoading) return null;

  return (
    <div className={styles.canciones}>
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
              isFavorite={favoritos.some((f) => f.id === cancion.trackId)}
              onToggleFavorite={() => onToggleFavorite(cancion)}
            />
          ))}
        </ProductList>
      ) : (
        <p>No se encontraron canciones para "{searchBusqueda}".</p>
      )}
    </div>
  );
}

export default Canciones;

