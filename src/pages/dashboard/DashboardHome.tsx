import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h5 className="font-bold text-xl leading-[30px] text-primary-main">
            Dashboard
          </h5>
          <div className="flex items-center gap-1 sm:gap-2 pt-3">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-primary-main"
            >
              <FaHome />
              ElectroBazaar
            </Link>
            <IoIosArrowForward className="mx-1 sm:mx-2" />
            <div className="text-slate-400">Dashboard</div>
          </div>
        </div>
      </div>
      <hr className="border-primary-main my-[23px]" />
    </div>
  );
};

export default DashboardHome;
