import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ErrorPage from "../pages/errorPage/ErrorPage";
import App from "../App";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AddGadget from "../pages/dashboard/AddGadget";
import ManageGadget from "../pages/dashboard/ManageGadget";
import ProductDetails from "../pages/dashboard/ProductDetails";
import UpdateGadget from "../pages/dashboard/UpdateGadget";
import ShopManagement from "../pages/dashboard/ShopManagement";
import SalesHistory from "../pages/dashboard/SalesHistory";
import UnProtectedRoute from "../components/layout/UnprotectedRoute";
import AuthorizedRoute from "../components/layout/AuthorizedRoute";
import { USER_ROLE } from "../constants/global";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "/add-gadgets",
        element: (
          <AuthorizedRoute
            roles={[USER_ROLE.user, USER_ROLE.manager, USER_ROLE.superAdmin]}
          >
            <AddGadget />
          </AuthorizedRoute>
        ),
      },
      {
        path: "/gadgets",
        element: (
          <AuthorizedRoute
            roles={[USER_ROLE.user, USER_ROLE.manager, USER_ROLE.superAdmin]}
          >
            <ManageGadget />
          </AuthorizedRoute>
        ),
      },
      {
        path: "/gadgets/view/:id",
        element: <ProductDetails />,
      },
      {
        path: "/gadgets/update/:id",
        element: (
          <AuthorizedRoute
            roles={[USER_ROLE.user, USER_ROLE.manager, USER_ROLE.superAdmin]}
          >
            <UpdateGadget />
          </AuthorizedRoute>
        ),
      },
      {
        path: "shop",
        element: <ShopManagement />,
      },
      {
        path: "sales-history",
        element: (
          <AuthorizedRoute
            roles={[USER_ROLE.user, USER_ROLE.manager, USER_ROLE.superAdmin]}
          >
            <SalesHistory />
          </AuthorizedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UnProtectedRoute>
        <Login />
      </UnProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <UnProtectedRoute>
        <Register />
      </UnProtectedRoute>
    ),
  },
]);

export default router;
