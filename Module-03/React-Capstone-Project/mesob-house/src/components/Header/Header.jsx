import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiShoppingBag, FiUser } from "react-icons/fi";
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
  const location = useLocation();
  const navigate = useNavigate();

  const isDishDetail = location.pathname.startsWith("/dish/");

  return (
    <header className={styles.header}>
      <div
        className={`${styles.standardHeader} ${
          isDishDetail ? styles.standardHeaderHiddenOnMobile : ""
        }`}
      >
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
            className={styles.cartSummary}
            aria-label="Shopping cart"
          >
            <FiShoppingBag aria-hidden="true" />
            <span>Cart</span>
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

      {isDishDetail && (
        <div className={styles.mobileDetailHeader}>
          <button
            type="button"
            className={styles.mobileBackButton}
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <span className={styles.mobileDetailTitle}>Dish Detail</span>

          <NavLink
            to="/cart"
            className={styles.mobileCartButton}
            aria-label="Shopping cart"
          >
            <FiShoppingBag aria-hidden="true" />
          </NavLink>
        </div>
      )}

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
