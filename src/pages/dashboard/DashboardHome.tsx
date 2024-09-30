import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import DashboardMetrics from "../../components/dashboardHome/ui/DashboardMetrics";
import RevenueChart from "../../components/dashboardHome/charts/RevenueChart";
import SoldPieChart from "../../components/dashboardHome/charts/SoldPieChart";
import LatestSales from "../../components/dashboardHome/sections/LatestSales";

const DashboardHome = () => {
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
          <RevenueChart />
          <SoldPieChart />
        </div>
        <LatestSales />
      </div>
    </div>
  );
};

export default DashboardHome;
