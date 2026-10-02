import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./cartItems.module.css";

function CartItems() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const location = useLocation();

  function handleRemove(id) {
    remove(id);
  }

  function handleClear() {
    clear();
  }

  return (
    <div className={styles.cartDishesList}>
      <div className={styles.contents}>
        {items.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty.</p>
        ) : (
          items.map((item) => {
            return (
              <div className={styles.cartItem} key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <p>
                    {`${item.quantity} X ${item.price} = ${item.quantity * item.price} ETB`}
                  </p>
                </div>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            );
          })
        )}
      </div>
      <div className={styles.summary}>
        <p>Total: {total} ETB.</p>
        <button onClick={handleClear}>Clear Cart</button>
      </div>
      {location.pathname === "/cart" && (
        <div className={styles.proceed}>
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}

export default CartItems;
