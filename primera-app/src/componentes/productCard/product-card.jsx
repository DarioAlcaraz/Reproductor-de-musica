import styles from "./product-card.module.css";
import { Heart, Play, Pause, Star } from "lucide-react";
import { useState, useRef } from "react";

function ProductCard({
  title,
  album,
  image,
  previewUrl,
  category,
  mensaje,
  isFavorite,
  onToggleFavorite,
}) {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayClick = () => {
    if (!previewUrl || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Error al reproducir:", err);
      });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={image || "/imagen_default.jpg"}
          alt={title || "Imagen por defecto"}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title} title={title}>{title}</h2>
        <p className={styles.album} title={album}>{album}</p>

        <div className={styles.footer}>
          <div className={styles.priceConteiner}>
            <span className={styles.price}>{category}</span>
            
          </div>

          <div className={styles.actions}>
            <button
              className={styles.iconButton}
              aria-label="Me gusta"
              onClick={() => setLiked(!liked)}
            >
              <Heart
                size={20}
                color={liked ? "#e60d1fff" : "#f7f0f0ff"}
                fill={liked ? "#e60d1fff" : "none"}
              />
            </button>

            <button
              className={styles.iconButton}
              aria-label="Reproducir"
              onClick={handlePlayClick}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              className={styles.iconButton}
              aria-label="Favorito"
              onClick={onToggleFavorite}
            >
              <Star
                size={20}
                color={isFavorite ? "#be0606" : "#fcfbfbff"}
                fill={isFavorite ? "#be0606" : "none"}
              />
            </button>

            
          </div>

          {previewUrl && (
            <audio
              ref={audioRef}
              src={previewUrl}
              onEnded={handleEnded}
              style={{ display: "none" }}
            />
          )}

          
        </div>
        {mensaje && (
              <div className={styles.mensaje}>{mensaje}</div>
            )}
        
      </div>
    </article>
  );
}

export default ProductCard;






