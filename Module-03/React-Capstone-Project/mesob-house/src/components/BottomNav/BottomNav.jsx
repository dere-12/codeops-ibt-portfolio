import { NavLink } from "react-router-dom";
import { FiStar, FiBookOpen, FiShoppingBag, FiUser } from "react-icons/fi";
import styles from "./BottomNav.module.css";

const navItems = [
  {
    label: "Specials",
    path: "/",
    icon: FiStar,
  },
  {
    label: "Menu",
    path: "/menu",
    icon: FiBookOpen,
  },
  {
    label: "Cart",
    path: "/cart",
    icon: FiShoppingBag,
  },
  {
    label: "Account",
    path: "/account",
    icon: FiUser,
  },
];

function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {navItems.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
