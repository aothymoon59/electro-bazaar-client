import { Layout, Menu } from "antd";
import logo from "../../assets/icons/lamp.png";
import { Link, Outlet } from "react-router-dom";
import { dashboardPaths } from "../../routes/dashboard.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { IoLogOut } from "react-icons/io5";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
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
      <Layout>
        <Header
          className="bg-primary-main flex justify-end items-center"
          style={{ padding: "0 20px" }}
        >
          <button className="flex items-center gap-1 cursor-pointer bg-transparent border-0 text-white text-sm lg:text-lg">
            <span>Logout</span>
            <IoLogOut />
          </button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 16,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
