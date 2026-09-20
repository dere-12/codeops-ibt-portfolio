import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import styles from "./BasketBar.module.css";

function BasketBar({ itemCount, total }) {
  if (itemCount === 0) {
    return null;
  }

  return (
    <aside className={styles.bar}>
      <div className={styles.summary}>
        <FiShoppingBag aria-hidden="true" />

        <div>
          <span className={styles.label}>Selected items</span>

          <strong>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </strong>
        </div>
      </div>

      <div className={styles.total}>
        <span>ETB {total.toLocaleString()}</span>

        <Link to="/cart" className={styles.button}>
          View Basket
        </Link>
      </div>
    </aside>
  );
}

export default BasketBar;
