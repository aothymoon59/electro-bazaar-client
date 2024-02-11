import { Layout, Menu } from "antd";
import logo from "../../assets/icons/lamp.png";
import { dashboardPaths } from "../../routes/dashboard.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className="bg-primary-main" breakpoint="lg" collapsedWidth="0">
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
    </Sider>
  );
};

export default Sidebar;
