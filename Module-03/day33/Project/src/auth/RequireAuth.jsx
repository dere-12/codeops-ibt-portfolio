import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
