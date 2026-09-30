import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import DishDetail from "./pages/DishDetail/DishDitail";
import CartItems from "./pages/CartItems/CartItems";
import CheckoutPanel from "./pages/CheckoutPanel/CheckoutPanel";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<DishDetail />} />
          <Route path="cart" element={<CartItems />} />
          <Route
            path="checkout"
            element={
              <RequireAuth>
                <CheckoutPanel />
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
