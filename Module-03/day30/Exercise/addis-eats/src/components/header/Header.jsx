import { useContext } from "react";
import "./Header.css";
import { CartContext } from "../../contexts/CartContextProvider";

function Header() {
  const { items } = useContext(CartContext);
  const count = items.reduce((sum, items) => sum + items.quantity, 0);
  return (
    <div className="header">
      <h1>Header</h1>
      <p>Cart ({count})</p>
    </div>
  );
}

export default Header;
