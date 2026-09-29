import CartItems from "../Cart/CartItems";
import OrderForm from "../../components/OrderForm/OrderForm";
import styles from "./checkoutPanel.module.css";

function CheckoutPanel() {
  return (
    <aside>
      <h3 className={styles.orderTitle}>Your Order Details</h3>
      <CartItems />
      <OrderForm />
    </aside>
  );
}

export default CheckoutPanel;
