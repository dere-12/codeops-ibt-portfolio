import CartItems from "../CartItems/CartItems";
import Checkout from "../../checkout/Checkout";
import ErrorBoundary, {
  ErrorFallback,
} from "../../components/ErrorBoundary/ErrorBoundary";
import styles from "./checkoutPanel.module.css";

function CheckoutPanel() {
  return (
    <div className={styles.checkoutCont}>
      <div className={styles.contents}>
        <h3 className={styles.orderTitle}>Your Order Details</h3>

        <ErrorBoundary
          fallback={({ resetErrorBoundary }) => (
            <ErrorFallback
              title="Cart panel unavailable"
              message="Your checkout form is still available, but we couldn't display the cart summary."
              onRetry={resetErrorBoundary}
            />
          )}
        >
          <CartItems />
        </ErrorBoundary>

        <Checkout />
      </div>
    </div>
  );
}

export default CheckoutPanel;
