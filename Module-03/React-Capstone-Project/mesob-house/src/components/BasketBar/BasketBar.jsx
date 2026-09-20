import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import styles from "./BasketBar.module.css";

function BasketBar({ itemCount, total }) {
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
