import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import DashboardMetrics from "../../components/dashboardHome/ui/DashboardMetrics";
import RevenueChart from "../../components/dashboardHome/charts/RevenueChart";

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
      </div>
    </div>
  );
};

export default DashboardHome;
