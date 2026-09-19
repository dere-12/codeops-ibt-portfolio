import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BottomNav from "../components/BottomNav/BottomNav";

function MainLayout() {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />

      <BottomNav />
    </>
  );
}

export default MainLayout;
