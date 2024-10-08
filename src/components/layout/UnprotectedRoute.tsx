import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { currentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const UnProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector(currentToken);

  if (!token) {
    return children;
  }

  return <Navigate to="/" replace={true} />;
};

export default UnProtectedRoute;

UnProtectedRoute.propTypes = {
  children: PropTypes.node,
};
