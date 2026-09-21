import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import styles from "./DishPurchase.module.css";

function DishPurchase({
  quantity,
  onDecrease,
  onIncrease,
  onAddToBasket,
  total,
}) {
  return (
    <div className={styles.purchase}>
      <div className={styles.quantity}>
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
        >
          <FiMinus aria-hidden="true" />
        </button>

        <span aria-live="polite">{quantity}</span>

        <button
          type="button"
          onClick={onIncrease}
          aria-label="Increase quantity"
        >
          <FiPlus aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={onAddToBasket}
      >
        <FiShoppingBag aria-hidden="true" />

        <span>Add to Basket</span>

        <strong>ETB {total.toLocaleString()}</strong>
      </button>
    </div>
  );
}

export default DishPurchase;
