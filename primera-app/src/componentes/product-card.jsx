import styles from "./product-card.module.css";
import {Heart, Play, Bookmark } from 'lucide-react';


function ProductCard(props) {

  

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer} >
        <img
            src={props.image || "/imagen_default.jpg"}
            alt={props.title || "Imagen por defecto"}
            className={styles.image}
        />
      </div>

      <div className= {styles.content}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.album}>{props.album}</p>
     
      
        <div className={styles.footer}>
          <div className={styles.priceConteiner} >
            <span className={styles.price}>{props.category}</span>
          </div>
        
      
          <div className={styles.actions}>
            <button className={styles.iconButton} aria-label="Me gusta">
              <Heart size={20} />
            </button>
            <button className={styles.iconButton} aria-label="Reproducir">
              <Play size={20} />
            </button>
            <button className={styles.iconButton} aria-label="Guardar">
              <Bookmark size={20} />
            </button>
          </div>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;

