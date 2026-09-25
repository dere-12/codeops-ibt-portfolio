import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import TodaysSpecials from "./pages/TodaysSpecials/TodaysSpecials";
import FullMenu from "./pages/FullMenu/FullMenu";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import JoinRegister from "./pages/JoinRegister/JoinRegister";
import DishDetail from "./pages/DishDetail";
import PlaceholderPage from "./pages/PlaceholderPage";
import GuestLogin from "./pages/GuestLogin/GuestLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TodaysSpecials />} />
          <Route path="/menu" element={<FullMenu />} />
          <Route
            path="/featured-dish"
            element={<PlaceholderPage title="Featured Dish" />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<JoinRegister />} />
          <Route path="/login" element={<GuestLogin />} />
          <Route path="/dish/:slug" element={<DishDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
