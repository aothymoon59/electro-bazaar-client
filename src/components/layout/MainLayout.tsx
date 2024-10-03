/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../../redux/hooks";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import FromTop from "../global/loaders/FromTop";

const { Header, Content } = Layout;

const MainLayout = () => {
  const user: any = useAppSelector(currentUser);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("DD MMM YYYY hh:mm:ss A"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <FromTop>
      <Layout className="h-screen">
        <Sidebar />
        <Layout>
          <Header
            className="bg-primary-main flex justify-end sm:justify-between items-center gap-2 sticky top-0 z-10"
            style={{ padding: "0 20px" }}
          >
            <div className="hidden sm:block">
              <p className="text-[13px] text-white font-medium">
                {currentTime}
              </p>
            </div>
            <div className="flex items-center gap-1 font-medium text-white">
              <FaUserCircle className="text-3xl" />
              <span className="text-[15px]">{user?.name?.split(" ")?.[0]}</span>
            </div>
          </Header>
          <Content className="rounded-lg p-[24px_16px_0px] bg-primary-lighter max-h-screen overflow-y-auto">
            <div className="p-4 min-h-[85vh] bg-primary-light rounded-lg">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </FromTop>
  );
};

export default MainLayout;
