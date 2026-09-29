import styles from "./header.module.css";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext/CartContextProvider";
import Navbar from "../NavBar/NavBar";

function Header() {
  const { items } = useContext(CartContext);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header>
      <h1> 🍽️ Addis Eats</h1>
      <Navbar />
      <div className={styles.cartBadge}>
        <p> 🛒 Cart ({count})</p>
      </div>
    </header>
  );
}

export default Header;
