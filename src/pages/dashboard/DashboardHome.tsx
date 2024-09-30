import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";

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
    </div>
  );
};

export default DashboardHome;
