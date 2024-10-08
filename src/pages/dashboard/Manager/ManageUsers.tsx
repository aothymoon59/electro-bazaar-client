/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "../../../components/ui/PageHeader";
import { FaHome } from "react-icons/fa";
import ManageUserAndCustomer from "../../../components/manageusers/section/ManageUserAndCustomer";

const ManageUsers = () => {
  return (
    <div className="w-full">
      <PageHeader
        title="Manage Users"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Manage Users", isCurrent: true },
        ]}
      />
      <ManageUserAndCustomer />
    </div>
  );
};

export default ManageUsers;
