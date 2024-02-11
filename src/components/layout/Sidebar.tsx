import { Layout, Menu } from "antd";
import logo from "../../assets/icons/lamp.png";
import { Link } from "react-router-dom";
import { dashboardPaths } from "../../routes/dashboard.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className="bg-primary-main" breakpoint="lg" collapsedWidth="0">
      <div className="h-16 flex justify-center items-center">
        <Link
          to={"/dashboard"}
          className="flex justify-center items-center gap-1 cursor-pointer text-white"
        >
          <img className="w-7 h-7" src={logo} alt="logo" />
          <h1>ElectroMart</h1>
        </Link>
      </div>
      <Menu
        className="bg-primary-main"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItemsGenerator(dashboardPaths)}
      />
    </Sider>
  );
};

export default Sidebar;
