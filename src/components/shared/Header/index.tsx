/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import logo from "../../../assets/icons/lamp.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import moment from "moment";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { currentUser, logout } from "../../../redux/features/auth/authSlice";
import { Dropdown, MenuProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { BiLogOutCircle } from "react-icons/bi";
import Swal from "sweetalert2";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}) => {
  const user: any = useAppSelector(currentUser);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("DD MMM YYYY hh:mm:ss A"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2A2F4F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire({
          title: "Logged out!",
          text: "Your account has been logged out.",
          icon: "success",
        });
      }
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>{user?.name?.split(" ")?.[0]}</span>,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      icon: <FaUserCircle />,
    },
    {
      key: "3",
      label: "Account Settings",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Logout",
      icon: <BiLogOutCircle size={17} />,
      onClick: () => {
        handleLogout();
      },
    },
  ];

  return (
    <header className="sticky top-0 z-[999] flex w-full bg-primary-main">
      <div className="flex flex-grow items-center justify-between px-3 py-4 xl:px-4">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block shadow-sm lg:hidden bg-primary-main px-2 py-1 rounded-lg text-white"
          >
            <GiHamburgerMenu size={20} />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <div className="flex justify-center items-center gap-1 text-white">
              <img className="w-7 h-7" src={logo} alt="logo" />
              <h1 className="hidden md:block">ElectroBazaar</h1>
            </div>
          </Link>
        </div>

        <div className="hidden sm:block">
          <p className="text-[13px] text-white font-medium">{currentTime}</p>
        </div>

        <div className="flex items-center gap-3 lg:gap-7">
          <ul className="flex items-center gap-2 lg:gap-4">
            {/* <!-- Notification Menu Area --> */}
            <IoMdNotifications
              className="text-white cursor-pointer"
              size={20}
            />
            {/* <!-- Notification Menu Area --> */}
            {/* <!-- Chat Notification Area --> */}
            <AiOutlineMessage className="text-white cursor-pointer" size={20} />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <div className="flex items-center text-white gap-2">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[13px]">
                {user?.name?.split(" ")?.slice(0, 2)?.join(" ")}
              </p>
              <span className="text-[10px]">{user?.role}</span>
            </div>
            <Dropdown
              className="cursor-pointer"
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <button className="bg-transparent border-none outline-none text-white">
                <FaUserCircle size={40} />
              </button>
            </Dropdown>

            {/* <FaUserCircle size={40} /> */}
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
