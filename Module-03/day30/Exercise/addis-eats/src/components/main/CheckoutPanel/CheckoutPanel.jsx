import CartItems from "../CartItems/CartItems";
import OrderForm from "../orderForm/OrderForm";
import "./CheckoutPanel.css";

function CheckoutPanel() {
  return (
    <div className="">
      <h3 className="orderTitle">Your Order Details</h3>
      <CartItems />
      <OrderForm />
    </div>
  );
}

export default CheckoutPanel;
