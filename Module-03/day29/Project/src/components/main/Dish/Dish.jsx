import styles from "./dish.module.css";
import Card from "../Card/Card";

function Dish({ dish, onAddToOrder, total, currency = "ETB" }) {
  function handleClick(price) {
    onAddToOrder(total + price);
  }

  return (
    <Card>
      <div>
        <div className={styles.cardTitle}>
          <h3>{dish.name}</h3>
          {dish.spicy && <span>🌶️ Spicy</span>}
        </div>
        <p className={styles.price}>
          {dish.price} {currency}
        </p>
      </div>
      <div className={styles.addToOrder}>
        <button onClick={() => handleClick(dish.price)}>Add To Order</button>
      </div>
    </Card>
  );
}

export default Dish;
