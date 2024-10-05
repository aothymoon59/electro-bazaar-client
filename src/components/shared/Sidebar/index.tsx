import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/icons/lamp.png";
import { FaArrowLeft } from "react-icons/fa6";
import { Menu } from "antd";
import { sidebarItemsGenerator } from "../../../utils/sidebarItemsGenerator";
import { dashboardPaths } from "../../../routes/dashboard.routes";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-72.5 flex-col overflow-y-hidden bg-primary-main duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-5">
        <Link to="/">
          <div className="flex justify-center items-center gap-1 text-white">
            <img className="w-7 h-7" src={logo} alt="logo" />
            <h1>ElectroBazaar</h1>
          </div>
        </Link>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="block lg:hidden bg-primary-main px-2 py-1"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
        >
          <FaArrowLeft className="text-white" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        {/* <nav className="py-4 px-4  lg:px-6"> */}
        <Menu
          className="bg-primary-main sider max-h-[80vh] overflow-y-auto"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItemsGenerator(dashboardPaths)}
        />
        {/* </nav> */}
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
