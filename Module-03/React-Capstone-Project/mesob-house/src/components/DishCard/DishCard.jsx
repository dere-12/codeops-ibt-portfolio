import styles from "./DishCard.module.css";

function DishCard({ dish, onQuickAdd }) {
  return (
    <article>
      <div className={styles.imagePlaceholder}>
        <span>Food image</span>
      </div>

      <div>
        <p>{dish.category}</p>

        <h2>{dish.nameEn}</h2>

        {dish.tagline && <p>{dish.tagline}</p>}

        <p>{dish.description}</p>

        <p>{dish.priceETB} ETB</p>

        <button type="button" onClick={() => onQuickAdd(dish)}>
          Quick Add
        </button>
      </div>
    </article>
  );
}

export default DishCard;
