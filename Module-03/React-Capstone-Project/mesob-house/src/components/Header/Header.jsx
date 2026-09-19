import { NavLink } from "react-router-dom";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import styles from "./Header.module.css";

const navigationItems = [
  {
    label: "Menu",
    path: "/menu",
  },
  {
    label: "Featured Dish",
    path: "/featured-dish",
  },
  {
    label: "Order & Cart",
    path: "/cart",
  },
  {
    label: "Delivery & Checkout",
    path: "/checkout",
  },
];

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.mainHeader}>
        <NavLink to="/" className={styles.logo} aria-label="Mesob House home">
          <span className={styles.logoName}>Mesob</span>

          <span className={styles.logoSubtitle}>
            HABESHA
            <br />
            HOUSE
          </span>
        </NavLink>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navigationItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/cart"
            className={styles.cartLink}
            aria-label="Shopping cart"
          >
            <FiShoppingBag aria-hidden="true" />
          </NavLink>

          <NavLink
            to="/account"
            className={styles.accountLink}
            aria-label="Account"
          >
            <FiUser aria-hidden="true" />

            <span>Account</span>
          </NavLink>
        </div>
      </div>

      <div className={styles.observationBar}>
        <span>
          Tsom / Fasting Observance: 12-item Royal Beyaynetu Vegan Platter
          simmered fresh all day.
        </span>

        <span>100% Pure Teff Injera Available · See Fasting Specialties →</span>
      </div>
    </header>
  );
}

export default Header;
