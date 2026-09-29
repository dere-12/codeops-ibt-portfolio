import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      {" | "}

      <NavLink
        to="/menu"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Menu
      </NavLink>

      {" | "}

      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Cart
      </NavLink>

      {" | "}

      <NavLink
        to="/checkout"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Checkout
      </NavLink>
    </nav>
  );
}

export default Navbar;
