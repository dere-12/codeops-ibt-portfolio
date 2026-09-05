import Menu from "./menu/Menu";
import Sidebar from "./sidebar/Sidebar";
import "./Main.css";
import { CartProvider } from "./cart/CartProvider";

function Main() {
  return (
    <div className="main">
      <Sidebar />
      <CartProvider>
        <Menu />
      </CartProvider>
    </div>
  );
}

export default Main;
