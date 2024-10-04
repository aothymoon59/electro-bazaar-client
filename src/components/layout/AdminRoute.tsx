import { ReactNode, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { currentToken, currentUser } from "../../redux/features/auth/authSlice";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user: any = useAppSelector(currentUser);
  const token = useAppSelector(currentToken);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      if (token) {
        return navigate("/dashboard");
      }
    }
  }, [navigate, location, token]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default AdminRoute;
