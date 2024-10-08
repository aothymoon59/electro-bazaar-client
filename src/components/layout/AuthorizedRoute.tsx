/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { currentUser } from "../../redux/features/auth/authSlice";
import { ReactNode } from "react";

interface AuthorizedRouteProps {
  roles: string[];
  children: ReactNode;
}
const AuthorizedRoute = ({ children, roles }: AuthorizedRouteProps) => {
  const user: any = useAppSelector(currentUser);

  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (!roles.includes(user.role)) {
    // If user does not have the required role, redirect to unauthorized or error page
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AuthorizedRoute;
