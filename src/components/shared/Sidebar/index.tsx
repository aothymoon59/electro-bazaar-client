/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/icons/lamp.png";
import { FaArrowLeft } from "react-icons/fa6";
import { useAppSelector } from "../../../redux/hooks";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { dashboardPaths } from "../../../routes/dashboardPaths";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const user: any = useAppSelector(currentUser);
  return (
    <aside
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-72.5 flex-col overflow-y-hidden bg-primary-main duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-5">
        <Link
          to="/"
          className="flex justify-center items-center gap-1 text-white"
        >
          <img className="w-7 h-7" src={logo} alt="logo" />
          <h2>ElectroBazaar</h2>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="block lg:hidden bg-primary-main px-2 py-1"
        >
          <FaArrowLeft className="text-white" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        {/* <nav className="py-4 px-4  lg:px-6"> */}
        <ul className="px-1">
          {dashboardPaths
            .filter((item) => item.role.includes(user?.role))
            .map((item, i) => {
              return (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary-lighter text-sm px-4 py-2 rounded flex items-center gap-2 text-primary-main my-1"
                        : "text-sm px-4 py-2 my-1 rounded flex items-center gap-2 text-primary-lighter"
                    }
                  >
                    {item.icon} <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
        </ul>
        {/* </nav> */}
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
