import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BottomNav from "../components/BottomNav/BottomNav";
import PageLoader from "../components/PageLoader/PageLoader";

function MainLayout() {
  const location = useLocation();

  const routeKey = `${location.pathname}${location.search}`;

  return (
    <>
      <Header />

      <ErrorBoundary key={routeKey}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>

      <Footer />

      <BottomNav />
    </>
  );
}

export default MainLayout;
