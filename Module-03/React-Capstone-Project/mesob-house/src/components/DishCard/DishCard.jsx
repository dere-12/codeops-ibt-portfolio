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

        <div className={styles.details}>
          <div className={styles.titleRow}>
            <div>
              <span className={styles.category}>{dish.category}</span>

              <h2 className={styles.name}>{dish.nameEn}</h2>
            </div>

            <span className={styles.price}>ETB {dish.priceETB}</span>
          </div>

          {dish.tagline && <p className={styles.tagline}>{dish.tagline}</p>}

          <p className={styles.description}>{dish.description}</p>

          <div className={styles.meta}>
            {dish.isFasting && <span>Fasting</span>}
            {dish.spiceLevel && <span>{dish.spiceLevel}</span>}
            {dish.servings && <span>{dish.servings}</span>}
          </div>
        </div>
      </Link>

      <button
        type="button"
        className={styles.quickAdd}
        onClick={() => onQuickAdd(dish)}
      >
        <FiPlus aria-hidden="true" />
        Quick Add
      </button>
    </article>
  );
}

export default DishCard;
