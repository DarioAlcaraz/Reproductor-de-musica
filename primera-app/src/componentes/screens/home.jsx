import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "../../api";
import ProductCard from "../productCard/product-card";
import ProductList from "../productList/product-list";
import styles from "../app.module.css";
import { useFavoritos } from "../../context/FavoritosContext";

function Home() {
  const {
    favoritos,
    toggleFavorito,
    removeFavorito,
    clearFavoritos,
  } = useFavoritos();

  // ✅ Géneros permitidos para cada lista
  const generosPermitidos1 = ["cuarteto", "latinos", "rock", "cumbia"];
  const generosPermitidos2 = ["trap", "reggaeton"];

  // ✅ Elegir un género al azar
  const generoRandom1 = generosPermitidos1[Math.floor(Math.random() * generosPermitidos1.length)];
  const generoRandom2 = generosPermitidos2[Math.floor(Math.random() * generosPermitidos2.length)];

  // ✅ Estado local para listas fijas
  const [lista1, setLista1] = useState([]);
  const [lista2, setLista2] = useState([]);

  // ✅ Búsquedas automáticas según género aleatorio
  const { data: data1 } = useQuery({
    queryKey: ["home-list-1", generoRandom1],
    queryFn: () => fetchSongs(generoRandom1),
  });

  const { data: data2 } = useQuery({
    queryKey: ["home-list-2", generoRandom2],
    queryFn: () => fetchSongs(generoRandom2),
  });

  const getRandomItems = (arr, count) => {
    if (!arr) return [];
    return [...arr]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  // ✅ Inicializar listas solo una vez
  useEffect(() => {
    if (data1?.results && lista1.length === 0) {
      setLista1(getRandomItems(data1.results, 6));
    }
  }, [data1, lista1.length]);

  useEffect(() => {
    if (data2?.results && lista2.length === 0) {
      setLista2(getRandomItems(data2.results, 6));
    }
  }, [data2, lista2.length]);

  // ✅ Botón para actualizar manualmente la música
  const handleActualizarMusica = () => {
    if (data1?.results) {
      setLista1(getRandomItems(data1.results, 6));
    }
    if (data2?.results) {
      setLista2(getRandomItems(data2.results, 6));
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <section className={styles.left}>
          {/* ✅ Botón para actualizar las listas */}
          <div className={styles.contbtn}>
            <button onClick={handleActualizarMusica} className={styles.btnActualizar}>
              Actualizar música
            </button>
          </div>

          <ProductList title={`Los más escuchados (${generoRandom1})`}>
            {lista1.map((song) => (
              <ProductCard
                key={song.trackId}
                title={song.trackName}
                album={song.collectionName}
                category={song.primaryGenreName}
                image={song.artworkUrl100}
                previewUrl={song.previewUrl}
                isFavorite={favoritos.some((item) => item.id === song.trackId)}
                onToggleFavorite={() => toggleFavorito(song)}
              />
            ))}
          </ProductList>

          <ProductList title={`Recuerdos (${generoRandom2})`}>
            {lista2.map((song) => (
              <ProductCard
                key={song.trackId}
                title={song.trackName}
                album={song.collectionName}
                category={song.primaryGenreName}
                image={song.artworkUrl100}
                previewUrl={song.previewUrl}
                isFavorite={favoritos.some((item) => item.id === song.trackId)}
                onToggleFavorite={() => toggleFavorito(song)}
              />
            ))}
          </ProductList>
        </section>

        <aside className={styles.favorito}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className={styles.titulo_favorito}>
              Mis Favoritos ({favoritos.length})
            </h2>

            {favoritos.length > 0 && (
              <button
                onClick={clearFavoritos}
                className={styles.btnVaciar}
              >
                Vaciar lista
              </button>
            )}
          </div>

          <ul>
            {favoritos.map((artist) => (
              <li key={artist.id} className={styles.favoritoItem}>
                <div>
                  <strong className={styles.titulo} title={artist.title}>
                    {artist.title}
                  </strong>{" "}
                  —{" "}
                  <em className={styles.album} title={artist.album}>
                    {artist.album}
                  </em>
                </div>

                <button
                  onClick={() => removeFavorito(artist.id)}
                  className={styles.btnQuitarFavorito}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}

export default Home;







