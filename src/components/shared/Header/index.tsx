/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import logo from "../../../assets/icons/lamp.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import moment from "moment";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "../../../redux/hooks";
import { currentUser } from "../../../redux/features/auth/authSlice";

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
            <IoMdNotifications className="text-white" size={20} />
            {/* <!-- Notification Menu Area --> */}
            {/* <!-- Chat Notification Area --> */}
            <AiOutlineMessage className="text-white" size={20} />
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
            <FaUserCircle size={40} />
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
