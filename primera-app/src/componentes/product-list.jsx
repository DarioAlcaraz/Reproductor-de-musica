import styles from "./product-list.module.css";
import ProductCard from "./product-card";

function ProductList(props) {
  return (
    <section className={styles.section} > 
      <h2 className={styles.sectionTitle}>{props.title} </h2>
      <div className={styles.productList} > {props.children}</div>       
    </section>
  );
}
export default ProductList
