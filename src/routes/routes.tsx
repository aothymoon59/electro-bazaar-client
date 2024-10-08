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
        element: <AddGadget />,
      },
      {
        path: "/gadgets",
        element: <ManageGadget />,
      },
      {
        path: "/gadgets/view/:id",
        element: <ProductDetails />,
      },
      {
        path: "/gadgets/update/:id",
        element: <UpdateGadget />,
      },
      {
        path: "shop",
        element: <ShopManagement />,
      },
      {
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
