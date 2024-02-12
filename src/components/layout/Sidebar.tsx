import { Layout, Menu } from "antd";
import logo from "../../assets/icons/lamp.png";
import { dashboardPaths } from "../../routes/dashboard.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { IoLogOut } from "react-icons/io5";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <Sider
      className="bg-primary-main relative"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="h-16 flex justify-center items-center">
        <div className="flex justify-center items-center gap-1 text-white">
          <img className="w-7 h-7" src={logo} alt="logo" />
          <h1>ElectroMart</h1>
        </div>
      </div>
      <Menu
        className="bg-primary-main"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItemsGenerator(dashboardPaths)}
      />
      <div className="flex justify-center items-center absolute bottom-4 left-[50%] translate-x-[-50%]">
        <button
          onClick={() => dispatch(setUser({ user: null, token: null }))}
          className="flex items-center gap-1 cursor-pointer bg-transparent border-0 text-white text-sm lg:text-lg"
        >
          <span>Logout</span>
          <IoLogOut />
        </button>
      </div>
    </Sider>
  );
};

export default Sidebar;
