/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import DashboardMetrics from "../../components/dashboardHome/ui/DashboardMetrics";
import SoldPieChart from "../../components/dashboardHome/charts/SoldPieChart";
import LatestSales from "../../components/dashboardHome/sections/LatestSales";
import { RevenueBarChart } from "../../components/dashboardHome/charts/RevenueBarChart";
import { useAppSelector } from "../../redux/hooks";
import { currentUser } from "../../redux/features/auth/authSlice";
import { USER_ROLE } from "../../constants/global";

const DashboardHome = () => {
  const user: any = useAppSelector(currentUser);
  return (
    <div className="w-full">
      <PageHeader
        // title="Dashboard"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Dashboard", isCurrent: true },
        ]}
      />
      <div>
        <DashboardMetrics />
        <div className="grid lg:grid-cols-[2fr_1fr] gap-5">
          <RevenueBarChart />
          <SoldPieChart />
        </div>
        {user.role !== USER_ROLE.customer ? <LatestSales /> : null}
      </div>
    </div>
  );
};

export default DashboardHome;
