import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import useCartStore from "../../store/cartStore";
import styles from "./BasketBar.module.css";

function BasketBar() {
  const items = useCartStore((state) => state.items);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const total = items.reduce(
    (sum, item) => sum + item.dish.priceETB * item.quantity,
    0,
  );

  return (
    <aside className={styles.bar}>
      <div className={styles.summary}>
        <FiShoppingBag aria-hidden="true" />

        <div>
          <span className={styles.label}>Selected</span>

          <strong>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </strong>
        </div>
      </div>

      <div className={styles.total}>
        <span>ETB {total.toLocaleString()}</span>

        <Link to="/cart" className={styles.button}>
          <span>View Basket</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}

export default BasketBar;
