import { NavLink } from "react-router-dom";
import { TDashboardPath, TSidebarItem } from "../types";

export const sidebarItemsGenerator = (items: TDashboardPath[]) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink className={`flex items-center gap-1`} to={`/${item.path}`}>
            {item.icon} <span>{item.name}</span>
          </NavLink>
        ),
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);
  return sidebarItems;
};
