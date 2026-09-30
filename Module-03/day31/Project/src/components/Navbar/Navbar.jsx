import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navCon}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Home
      </NavLink>

      {" | "}

      <NavLink
        to="/menu"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Menu
      </NavLink>

      {" | "}

      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Cart
      </NavLink>

      {" | "}

      <NavLink
        to="/checkout"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Checkout
      </NavLink>
    </nav>
  );
}

export default Navbar;
