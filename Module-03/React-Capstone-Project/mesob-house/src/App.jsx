import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import DishDetail from "./pages/DishDetail";
import FullMenu from "./pages/FullMenu/FullMenu";
import GuestLogin from "./pages/GuestLogin/GuestLogin";
import JoinRegister from "./pages/JoinRegister/JoinRegister";
import NotFound from "./pages/NotFound/NotFound";
import TodaysSpecials from "./pages/TodaysSpecials/TodaysSpecials";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TodaysSpecials />} />
          <Route path="/menu" element={<FullMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/account" element={<JoinRegister />} />
          <Route path="/login" element={<GuestLogin />} />
          <Route path="/dish/:slug" element={<DishDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
