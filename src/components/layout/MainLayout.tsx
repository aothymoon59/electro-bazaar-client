import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header
          className="bg-primary-main flex justify-end items-center"
          style={{ padding: "0 20px" }}
        >
          <button
            onClick={() => dispatch(setUser({ user: null, token: null }))}
            className="flex items-center gap-1 cursor-pointer bg-transparent border-0 text-white text-sm lg:text-lg"
          >
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
      </Layout>
    </Layout>
  );
};

export default MainLayout;
