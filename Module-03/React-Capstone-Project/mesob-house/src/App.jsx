import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import TodaysSpecials from "./pages/TodaysSpecials/TodaysSpecials";
import FullMenu from "./pages/FullMenu/FullMenu";
import Cart from "./pages/Cart/Cart";
import DishDetail from "./pages/DishDetail";
import PlaceholderPage from "./pages/PlaceholderPage";

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
          <Route
            path="/checkout"
            element={<PlaceholderPage title="Checkout" />}
          />
          <Route
            path="/account"
            element={<PlaceholderPage title="Account" />}
          />
          <Route path="/dish/:slug" element={<DishDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
