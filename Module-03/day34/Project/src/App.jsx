import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import DishDetail from "./pages/DishDetail/DishDetail";
import CartItems from "./pages/CartItems/CartItems";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import RequireAuth from "./auth/RequireAuth";
import ErrorBoundary, {
  ErrorFallback,
} from "./components/ErrorBoundary/ErrorBoundary";
import PageSkeleton from "./components/PageSkeleton/PageSkeleton";

const CheckoutPanel = lazy(() => import("./pages/CheckoutPanel/CheckoutPanel"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="menu"
            element={
              <ErrorBoundary
                fallback={({ resetErrorBoundary }) => (
                  <ErrorFallback
                    title="Menu unavailable"
                    message="We couldn't display the menu. Try loading it again."
                    onRetry={resetErrorBoundary}
                  />
                )}
              >
                <Menu />
              </ErrorBoundary>
            }
          />

          <Route path="menu/:id" element={<DishDetail />} />

          <Route
            path="cart"
            element={
              <ErrorBoundary
                fallback={({ resetErrorBoundary }) => (
                  <ErrorFallback
                    title="Cart unavailable"
                    message="We couldn't display your cart. Try loading it again."
                    onRetry={resetErrorBoundary}
                  />
                )}
              >
                <CartItems />
              </ErrorBoundary>
            }
          />

          <Route
            path="checkout"
            element={
              <RequireAuth>
                <ErrorBoundary
                  fallback={({ resetErrorBoundary }) => (
                    <ErrorFallback
                      title="Checkout unavailable"
                      message="Checkout couldn't be displayed. Try loading it again."
                      onRetry={resetErrorBoundary}
                    />
                  )}
                >
                  <Suspense fallback={<PageSkeleton label="checkout" />}>
                    <CheckoutPanel />
                  </Suspense>
                </ErrorBoundary>
              </RequireAuth>
            }
          />

          <Route path="login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
