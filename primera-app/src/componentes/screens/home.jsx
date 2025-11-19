import ProductCard from "../product-card";
import styles from "../app.module.css";
import ProductList from "../product-list";
import { products, products2 } from "../products";
import { useFavoritos } from "../../context/FavoritosContext";


function Home() {
  const { favoritos, setFavoritos } = useFavoritos();

  const toggleFavorito = (product) => {
    const exists = favoritos.find((item) => item.id === product.id);
    setFavoritos(
      exists
        ? favoritos.filter((item) => item.id !== product.id)
        : [...favoritos, { id: product.id, title: product.title, album: product.album }]
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <section className={styles.left}>
          <ProductList title="Los más escuchados">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                album={product.album}
                category={product.category}
                image={product.image}
                mensaje={product.mensaje}
                isFavorite={favoritos.some((item) => item.id === product.id)}
                onToggleFavorite={() => toggleFavorito(product)}
              />
            ))}
          </ProductList>

          <ProductList title="Recuerdos">
            {products2.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                album={product.album}
                category={product.category}
                image={product.image}
                mensaje={product.mensaje}
                isFavorite={favoritos.some((item) => item.id === product.id)}
                onToggleFavorite={() => toggleFavorito(product)}
              />
            ))}
          </ProductList>
        </section>

        <aside className={styles.favorito}>
          <h2 className={styles.titulo_favorito}>Mis Favoritos ({favoritos.length})</h2>
          <ul>
            {favoritos.map((artist) => (
              <li key={artist.id} className={styles.favoritoItem}>
                <strong className={styles.titulo} title={artist.title}>{artist.title}</strong> —{" "}
                <em className={styles.album} title={artist.album}>{artist.album}</em>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}

export default Home;



