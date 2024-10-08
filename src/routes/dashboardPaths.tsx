import { BiSitemap, BiSolidAddToQueue } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { USER_ROLE } from "../constants/global";

interface IRoute {
  path: string;
  icon: JSX.Element;
  label: string;
  role: ("user" | "manager" | "customer" | "superAdmin")[];
}

export const dashboardPaths: IRoute[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
    role: [
      USER_ROLE.manager,
      USER_ROLE.user,
      USER_ROLE.customer,
      USER_ROLE.superAdmin,
    ],
  },
  {
    label: "Add Gadgets",
    path: "/add-gadgets",
    icon: <BiSolidAddToQueue />,
    role: [USER_ROLE.manager, USER_ROLE.superAdmin, USER_ROLE.user],
  },
  {
    label: "Manage Gadgets",
    path: "/gadgets",
    icon: <MdDashboard />,
    role: [USER_ROLE.manager, USER_ROLE.superAdmin, USER_ROLE.user],
  },
  {
    label: "Shop",
    path: "/shop",
    icon: <BiSitemap />,
    role: [
      USER_ROLE.user,
      USER_ROLE.customer,
      USER_ROLE.manager,
      USER_ROLE.superAdmin,
    ],
  },
  {
    label: "Sales History",
    path: "/sales-history",
    icon: <FaHistory />,
    role: [USER_ROLE.manager, USER_ROLE.superAdmin, USER_ROLE.user],
  },
  {
    label: "Manage Users",
    path: "/manage-users",
    icon: <FaUsers />,
    role: [USER_ROLE.manager, USER_ROLE.superAdmin],
  },
];
