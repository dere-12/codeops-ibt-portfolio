import styles from "./dish.module.css";
import Card from "../Card/Card";

function Dish({ name, price, spicy = false, currency = "ETB" }) {
  return (
    <Card>
      <div className={styles.cardTitle}>
        <h3>{name}</h3>
        {spicy && <span>🌶️ Spicy</span>}
      </div>
      <p className={styles.price}>
        {price} {currency}
      </p>
    </Card>
  );
}

export default Dish;
