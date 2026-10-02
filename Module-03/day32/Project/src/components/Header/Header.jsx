import styles from "./header.module.css";
import { useCartStore } from "../../store/cartStore";
import Navbar from "../Navbar/Navbar";

function Header() {
  const items = useCartStore((state) => state.items);
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
