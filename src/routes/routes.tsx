import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { dashboardPaths } from "./dashboard.routes";
import { routesGenerator } from "../utils/routesGenerator";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ErrorPage from "../pages/errorPage/ErrorPage";
// import MainLayout from "../components/layout/MainLayout";
import DefaultLayout from "../components/layout/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        {/* <MainLayout /> */}
        <DefaultLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: routesGenerator(dashboardPaths),
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
