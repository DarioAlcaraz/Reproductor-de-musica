import { createContext, useContext, useState, useEffect } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const stored = localStorage.getItem("favoritos");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Guardar en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // ✅ Agregar o quitar favorito desde ProductCard
  const toggleFavorito = (song) => {
    const exists = favoritos.find((item) => item.id === song.trackId);

    if (exists) {
      setFavoritos(favoritos.filter((item) => item.id !== song.trackId));
    } else {
      setFavoritos([
        ...favoritos,
        {
          id: song.trackId,
          title: song.trackName,
          album: song.collectionName,
        },
      ]);
    }
  };

  // ✅ Quitar un favorito desde la lista
  const removeFavorito = (id) => {
    setFavoritos(favoritos.filter((item) => item.id !== id));
  };

  // ✅ Vaciar toda la lista
  const clearFavoritos = () => {
    setFavoritos([]);
  };

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        setFavoritos,
        toggleFavorito,
        removeFavorito,
        clearFavoritos,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}

