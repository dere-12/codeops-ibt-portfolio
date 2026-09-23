import { NavLink } from "react-router-dom";
import { FiStar, FiBookOpen, FiShoppingBag, FiUser } from "react-icons/fi";
import useCartStore from "../../store/cartStore";
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
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

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
          <span className={styles.iconWrapper}>
            <Icon aria-hidden="true" />

            {label === "Cart" && cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </span>

          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
