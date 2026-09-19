import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import styles from "./DishCard.module.css";

function DishCard({ dish, onQuickAdd }) {
  return (
    <article className={styles.card}>
      <Link to={`/dish/${dish.slug}`} className={styles.dishLink}>
        <div className={styles.imagePlaceholder}>
          <span>Food image</span>
        </div>

        <div className={styles.content}>
          <div className={styles.topRow}>
            <span className={styles.category}>{dish.category}</span>

            <span className={styles.price}>ETB {dish.priceETB}</span>
          </div>

          <h2 className={styles.name}>{dish.nameEn}</h2>

          {dish.nameAm && <p className={styles.nameAm}>{dish.nameAm}</p>}

          {dish.tagline && <p className={styles.tagline}>{dish.tagline}</p>}

          <p className={styles.description}>{dish.description}</p>

          <div className={styles.meta}>
            {dish.isFasting && <span className={styles.metaItem}>Fasting</span>}

            {dish.servings && (
              <span className={styles.metaItem}>{dish.servings}</span>
            )}
          </div>
        </div>
      </Link>

      <button
        type="button"
        className={styles.quickAdd}
        onClick={() => onQuickAdd(dish)}
      >
        <FiPlus aria-hidden="true" />
        <span>Quick Add</span>
      </button>
    </article>
  );
}

export default DishCard;
