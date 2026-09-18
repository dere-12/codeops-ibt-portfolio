import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav/BottomNav";

function MainLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}

export default MainLayout;
