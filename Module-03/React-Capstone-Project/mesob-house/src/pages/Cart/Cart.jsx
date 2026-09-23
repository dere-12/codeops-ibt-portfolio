import { FiArrowRight, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import useCartStore from "../../store/cartStore";
import styles from "./Cart.module.css";

function Cart() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.dish.priceETB * item.quantity,
    0,
  );

  const formattedTotal = `ETB ${subtotal.toLocaleString()}`;

  return (
    <main className={styles.page}>
      <section className={styles.mobileProgress}>
        <div className={styles.progressStep}>
          <span>1</span>
          <strong>Step 1 of 3</strong>
        </div>

        <div className={styles.progressLabels}>
          <span className={styles.active}>BASKET</span>
          <span>{">"}</span>
          <span>DELIVERY</span>
          <span>{">"}</span>
          <span>DONE</span>
        </div>
      </section>

      <section className={styles.desktopHero}>
        <div>
          <span className={styles.eyebrow}>COMMUNAL FEASTING</span>
          <h1>Your Gursha Basket</h1>
        </div>

        <div className={styles.desktopProgress}>
          <span className={styles.activeStep}>
            <strong>1</strong>
            Review Basket
          </span>

          <span>/</span>

          <span>
            <strong>2</strong>
            Delivery Details
          </span>

          <span>/</span>

          <span>
            <strong>3</strong>
            Confirmation
          </span>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.mobileHeading}>
          <div className={styles.headingRow}>
            <h1>Your Gursha Basket</h1>

            <span>
              {itemCount} {itemCount === 1 ? "Delicacy" : "Delicacies"}
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FiShoppingBag />
            </div>

            <h2>Your basket is empty</h2>

            <p>Add some of your favorite Mesob House dishes to get started.</p>

            <Link to="/menu" className={styles.emptyLink}>
              Browse the Menu
              <FiArrowRight />
            </Link>
          </section>
        ) : (
          <div className={styles.cartLayout}>
            <section className={styles.basketColumn}>
              <div className={styles.basketHeading}>
                <div>
                  <h2>Clay Pot Stews & Provisions</h2>
                  <span>
                    ({itemCount} handcrafted{" "}
                    {itemCount === 1 ? "selection" : "selections"})
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={clearCart}
                >
                  <FiTrash2 />
                  Clear Table
                </button>
              </div>

              <div className={styles.itemsList}>
                {items.map((item) => (
                  <CartItem key={item.dish.id} item={item} />
                ))}
              </div>

              <div className={styles.mobileSummary}>
                <OrderSummary
                  itemCount={itemCount}
                  formattedTotal={formattedTotal}
                />
              </div>
            </section>

            <aside className={styles.ledgerColumn}>
              <OrderSummary
                itemCount={itemCount}
                formattedTotal={formattedTotal}
                showCheckout
                onCheckout={() => navigate("/checkout")}
              />
            </aside>
          </div>
        )}
      </section>

      {items.length > 0 && (
        <div className={styles.mobileCheckoutBar}>
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className={styles.checkoutButton}
          >
            <span className={styles.checkoutLabel}>
              <FiShoppingBag />
              Proceed to Checkout
            </span>

            <span className={styles.checkoutTotal}>
              {formattedTotal}
              <FiArrowRight />
            </span>
          </button>
        </div>
      )}
    </main>
  );
}

function OrderSummary({
  itemCount,
  formattedTotal,
  showCheckout = false,
  onCheckout,
}) {
  return (
    <section className={styles.summary}>
      <div className={styles.summaryHeader}>
        <h2>Basket Ledger</h2>
        <span>Birr (ETB)</span>
      </div>

      <div className={styles.summaryRow}>
        <span>
          Items Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>

        <strong>{formattedTotal}</strong>
      </div>

      <div className={styles.totalRow}>
        <div>
          <span>Grand Total</span>
          <small>Current basket total</small>
        </div>

        <strong>{formattedTotal}</strong>
      </div>

      {showCheckout && (
        <button
          type="button"
          className={styles.desktopCheckoutButton}
          onClick={onCheckout}
        >
          Proceed to Delivery Checkout
          <FiArrowRight />
        </button>
      )}

      {showCheckout && (
        <p className={styles.ledgerNote}>
          Your order total is based only on the dishes and quantities currently
          in your basket.
        </p>
      )}
    </section>
  );
}

export default Cart;
