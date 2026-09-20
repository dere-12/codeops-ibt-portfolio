import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import styles from "./DishCard.module.css";

function DishCard({ dish, onQuickAdd, showDetails = true }) {
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

          <p className={styles.description}>{dish.description}</p>

          {dish.isFasting && (
            <div className={styles.meta}>
              <span className={styles.metaItem}>Fasting</span>
            </div>
          )}
        </div>
      </Link>

      <div
        className={`${styles.actions} ${
          showDetails ? "" : styles.actionsSingle
        }`}
      >
        {showDetails && (
          <Link to={`/dish/${dish.slug}`} className={styles.detailsLink}>
            View Details
            <FiArrowRight aria-hidden="true" />
          </Link>
        )}

        <button
          type="button"
          className={styles.quickAdd}
          onClick={() => onQuickAdd(dish)}
          aria-label={`Add ${dish.nameEn} to basket`}
        >
          <FiPlus aria-hidden="true" />

          <span className={styles.quickAddText}>Quick Add</span>
        </button>
      </div>
    </article>
  );
}

export default DishCard;
