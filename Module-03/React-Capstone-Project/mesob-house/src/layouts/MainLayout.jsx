import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import BottomNav from "../components/BottomNav/BottomNav";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNav />
    </>
  );
}

export default MainLayout;
