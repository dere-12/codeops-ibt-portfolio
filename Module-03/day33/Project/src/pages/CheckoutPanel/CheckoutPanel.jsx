import CartItems from "../CartItems/CartItems";
import Checkout from "../../checkout/Checkout";
import styles from "./checkoutPanel.module.css";

function CheckoutPanel() {
  return (
    <div className={styles.checkoutCont}>
      <div className={styles.contents}>
        <h3 className={styles.orderTitle}>Your Order Details</h3>

        <CartItems />

        <Checkout />
      </div>
    </div>
  );
}

export default CheckoutPanel;
