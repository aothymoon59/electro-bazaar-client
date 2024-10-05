import AddGadget from "../pages/dashboard/AddGadget";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageGadget from "../pages/dashboard/ManageGadget";
import SalesHistory from "../pages/dashboard/SalesHistory";
// import SalesManagement from "../pages/dashboard/SalesManagement";
import { MdDashboard } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdOutlineViewList } from "react-icons/md";
import { BiSitemap } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import UpdateGadget from "../pages/dashboard/UpdateGadget";
import ProductDetails from "../pages/dashboard/ProductDetails";
import ShopManagement from "../pages/dashboard/ShopManagement";
import ManageUsers from "../pages/dashboard/Manager/ManageUsers";

export const adminPaths = [
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
    name: "Manage Users",
    path: "users",
    element: <ManageUsers />,
    icon: <MdOutlineViewList />,
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
    name: "Shop",
    path: "shop",
    element: <ShopManagement />,
    icon: <BiSitemap />,
  },
  {
    name: "Sales History",
    path: "sales-history",
    element: <SalesHistory />,
    icon: <FaHistory />,
  },
];
