import ProductCard from "./product-card";
import Header from "./header";
import styles from "./app.module.css";
import ProductList from "./product-list";
import { products } from "./products";
import Favoritos from "./Favoritos.module";
import { products2 } from "./products";

function App() {
  return (
    <div>
      <Header/>
      <main className={styles.main} >
        <div className={styles.layout} >
          <section className= {styles.left}>{/*IZQUIERDA*/}
          <ProductList title="Los más escuchados" products={products}>
          {products.map(product => (
              <ProductCard
              key={product.id}
              title = {product.title} 
              album= {product.album}
              category={product.category} 
              image={product.image} 
            />
            ))}
          </ProductList>
            <ProductList title="Recuerdos">
          {products2.map(product => (
              <ProductCard
              key={product.id}
              title = {product.title} 
              album= {product.album}
              category={product.category} 
              image={product.image} 
            />
            ))}
          </ProductList>
        </section>

        <aside className={styles.favorito} >
          <h2 className={styles.titulo_favorito} >Mis Favoritos</h2>
          <ul>
            {Favoritos.map((artist) => (
            <li key={artist.id}>
              <strong className={styles.titulo}>{artist.title}</strong> — <em className={styles.album}>{artist.album}</em>
            </li>
            ))}
            
          </ul>
        </aside>
        </div>
      </main>
        
    </div>
  );
}
                            


export default App;