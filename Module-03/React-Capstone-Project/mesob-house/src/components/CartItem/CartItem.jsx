import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import useCartStore from "../../store/cartStore";
import styles from "./CartItem.module.css";

function CartItem({ item }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const { dish, quantity } = item;

  return (
    <article className={styles.item}>
      <div className={styles.imagePlaceholder}>
        <span>Food Image</span>
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <div>
            <h2>{dish.nameEn}</h2>

            {dish.nameAm && (
              <span className={styles.nameAm}>{dish.nameAm}</span>
            )}
          </div>

          <button
            type="button"
            className={styles.mobileRemoveButton}
            onClick={() => removeFromCart(dish.id)}
            aria-label={`Remove ${dish.nameEn} from cart`}
          >
            <FiX />
          </button>
        </div>

        <p className={styles.description}>
          {dish.tagline || dish.description || "Mesob House specialty dish"}
        </p>

        <div className={styles.bottomRow}>
          <p className={styles.price}>ETB {dish.priceETB.toLocaleString()}</p>

          <div className={styles.quantityControl}>
            <button
              type="button"
              onClick={() => decreaseQuantity(dish.id)}
              aria-label={`Decrease ${dish.nameEn} quantity`}
            >
              <FiMinus />
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => increaseQuantity(dish.id)}
              aria-label={`Increase ${dish.nameEn} quantity`}
            >
              <FiPlus />
            </button>
          </div>

          <button
            type="button"
            className={styles.desktopRemoveButton}
            onClick={() => removeFromCart(dish.id)}
            aria-label={`Remove ${dish.nameEn} from cart`}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
