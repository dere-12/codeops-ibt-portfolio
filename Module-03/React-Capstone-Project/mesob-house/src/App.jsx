import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

const TodaysSpecials = lazy(
  () => import("./pages/TodaysSpecials/TodaysSpecials"),
);

const FullMenu = lazy(() => import("./pages/FullMenu/FullMenu"));

const Cart = lazy(() => import("./pages/Cart/Cart"));

const Checkout = lazy(() => import("./pages/Checkout/Checkout"));

const JoinRegister = lazy(() => import("./pages/JoinRegister/JoinRegister"));

const DishDetail = lazy(() => import("./pages/DishDetail"));

const GuestLogin = lazy(() => import("./pages/GuestLogin/GuestLogin"));

const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

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
