import AddGadget from "../pages/dashboard/AddGadget";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageGadget from "../pages/dashboard/ManageGadget";
import SalesHistory from "../pages/dashboard/SalesHistory";
import SalesManagement from "../pages/dashboard/SalesManagement";
import { MdDashboard } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdOutlineViewList } from "react-icons/md";
import { BiSitemap } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import UpdateGadget from "../pages/dashboard/UpdateGadget";
import ProductDetails from "../pages/dashboard/ProductDetails";

export const dashboardPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <DashboardHome />,
    icon: <MdDashboard />,
  },
  {
    name: "Add Gadgets",
    path: "add-gadgets",
    element: <AddGadget />,
    icon: <BiSolidAddToQueue />,
  },
  {
    name: "Manage Gadgets",
    path: "gadgets",
    element: <ManageGadget />,
    icon: <MdOutlineViewList />,
  },
  {
    name: "",
    path: "gadgets/view/:id",
    element: <ProductDetails />,
    icon: "",
  },
  {
    name: "",
    path: "gadgets/update/:id",
    element: <UpdateGadget />,
    icon: "",
  },
  {
    name: "Sales Management",
    path: "sales-management",
    element: <SalesManagement />,
    icon: <BiSitemap />,
  },
  {
    name: "Sales History",
    path: "sales-history",
    element: <SalesHistory />,
    icon: <FaHistory />,
  },
];
