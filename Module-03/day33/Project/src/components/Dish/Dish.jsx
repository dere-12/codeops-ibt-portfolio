import { Link } from "react-router-dom";
import styles from "./dish.module.css";
import Card from "../Card/Card";
import { useCartStore } from "../../store/cartStore";

function Dish({ dish, currency = "ETB" }) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart() {
    addItem(dish);
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
      <div className={styles.cardBottom}>
        <div className={styles.addToCart}>
          <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
        <div className={styles.viewDetail}>
          <Link to={`/menu/${dish.id}`}>View Details</Link>
        </div>
      </div>
    </Card>
  );
}

export default Dish;
