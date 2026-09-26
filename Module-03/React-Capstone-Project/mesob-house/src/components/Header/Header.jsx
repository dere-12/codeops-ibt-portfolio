import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiLogIn,
  FiLogOut,
  FiShoppingBag,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import styles from "./Header.module.css";

const navigationItems = [
  {
    label: "Menu",
    path: "/menu",
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

  const items = useCartStore((state) => state.items);

  const account = useAuthStore((state) => state.account);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signOut = useAuthStore((state) => state.signOut);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  function handleSignOut() {
    signOut();
    navigate("/");
  }

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
            aria-label={`Shopping cart, ${cartCount} ${
              cartCount === 1 ? "item" : "items"
            }`}
          >
            <span className={styles.cartIconWrapper}>
              <FiShoppingBag aria-hidden="true" />

              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </span>

            <span>Cart</span>
          </NavLink>

          {isAuthenticated ? (
            <div className={styles.welcomeGroup}>
              <span className={styles.welcomeMessage}>
                <FiUser aria-hidden="true" />
                Welcome {account?.fullName || "Guest"}
              </span>

              <button
                type="button"
                className={styles.signOutButton}
                onClick={handleSignOut}
              >
                <FiLogOut aria-hidden="true" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <NavLink to="/login" className={styles.authLink}>
                <FiLogIn aria-hidden="true" />
                Sign In
              </NavLink>

              <NavLink to="/account" className={styles.authLinkPrimary}>
                <FiUserPlus aria-hidden="true" />
                Register
              </NavLink>
            </div>
          )}
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
            aria-label={`Shopping cart, ${cartCount} ${
              cartCount === 1 ? "item" : "items"
            }`}
          >
            <span className={styles.cartIconWrapper}>
              <FiShoppingBag aria-hidden="true" />

              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </span>
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
