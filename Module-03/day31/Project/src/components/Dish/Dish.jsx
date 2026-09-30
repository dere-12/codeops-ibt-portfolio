import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./dish.module.css";
import Card from "../Card/Card";
import { CartContext } from "../../contexts/CartContext/CartContextProvider";

function Dish({ dish, currency = "ETB" }) {
  const { dispatch } = useContext(CartContext);

  function handleAddToCart() {
    dispatch({ type: "add", dish: dish });
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
