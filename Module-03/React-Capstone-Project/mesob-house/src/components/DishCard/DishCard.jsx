import { Link } from "react-router-dom";
import styles from "./DishCard.module.css";

function DishCard({ dish, onQuickAdd }) {
  return (
    <article>
      <Link to={`/dish/${dish.slug}`} className={styles.dishLink}>
        <div className={styles.imagePlaceholder}>
          <span>Food image</span>
        </div>

        <div>
          <p>{dish.category}</p>
          <h2>{dish.nameEn}</h2>

          {dish.tagline && <p>{dish.tagline}</p>}

          <p>{dish.description}</p>
          <p>{dish.priceETB} ETB</p>
        </div>
      </Link>

      <button type="button" onClick={() => onQuickAdd(dish)}>
        Quick Add
      </button>
    </article>
  );
}

export default DishCard;
