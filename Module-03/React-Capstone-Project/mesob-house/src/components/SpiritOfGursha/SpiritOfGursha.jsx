import { FiHeart } from "react-icons/fi";
import styles from "./SpiritOfGursha.module.css";

function SpiritOfGursha({ products }) {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <span className={styles.label}>THE SPIRIT OF GURSHA</span>

        <h2 className={styles.title}>Dining is an act of love.</h2>

        <p className={styles.description}>
          In Ethiopian culture, dining is an act of love. When you feed someone
          with your own hand—a gursha—you cement bonds of friendship, family,
          and shared respect.
        </p>

        <div className={styles.message}>
          <FiHeart aria-hidden="true" />
          <span>Share generously. Eat together. Make room at the mesob.</span>
        </div>
      </div>

      <div className={styles.products}>
        {products.map((product) => (
          <article key={product.id} className={styles.productCard}>
            <div className={styles.imagePlaceholder}>
              <span>Food image</span>
            </div>

            <div className={styles.productContent}>
              <span className={styles.category}>{product.category}</span>

              <h3 className={styles.productName}>{product.nameEn}</h3>

              <p className={styles.productDescription}>{product.description}</p>

              <div className={styles.productFooter}>
                <span className={styles.price}>ETB {product.priceETB}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SpiritOfGursha;
