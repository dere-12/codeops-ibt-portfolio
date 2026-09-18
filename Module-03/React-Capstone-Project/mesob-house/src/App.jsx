import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodaysSpecials from "./pages/TodaysSpecials";
import DishDetail from "./pages/DishDetail";
import PlaceholderPage from "./pages/PlaceholderPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TodaysSpecials />} />
          <Route path="/menu" element={<PlaceholderPage title="Menu" />} />
          <Route path="/cart" element={<PlaceholderPage title="Cart" />} />
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
