import CartItems from "../CartItems/CartItems";
import OrderForm from "../../components/OrderForm/OrderForm";
import styles from "./checkoutPanel.module.css";

function CheckoutPanel() {
  return (
    <div className={styles.checkoutCont}>
      <div className={styles.contents}>
        <h3 className={styles.orderTitle}>Your Order Details</h3>
        <CartItems />
        <OrderForm />
      </div>
    </div>
  );
}

export default CheckoutPanel;
