/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table, TableProps } from "antd";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import AntdTableSkeleton from "../../../components/global/loaders/tableskeleton/AntdTableSkeleton";
import { useGetAllUsersQuery } from "../../../redux/features/users/usersApi";
import { FaHome, FaTrash } from "react-icons/fa";

interface userData {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isDeleted: string;
}

const ManageUsers = () => {
  const [page, setPage] = useState(1);

  const { data: allUsers, isLoading: isAllUsersLoading } = useGetAllUsersQuery({
    name: "page",
    value: page,
  });

  const handleDeleteUser = (id: string) => {
    console.log(id);
  };

  const columns: TableProps<userData>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      fixed: "right",
      width: 150,
      render: (_text, record) => (
        <div className="flex justify-start items-center gap-3">
          {/* <Link to={`/gadgets/view/${record._id}`}>
            <FaEye size={18} />
          </Link> */}
          <a onClick={() => handleDeleteUser(record._id)}>
            <FaTrash size={14} className="text-red-500" />
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <PageHeader
        title="Manage Users"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Manage Users", isCurrent: true },
        ]}
      />
      <div className="overflow-x-auto sales-history">
        {isAllUsersLoading ? (
          <AntdTableSkeleton />
        ) : (
          <Table
            className="custom-table"
            scroll={{ x: 1024 }}
            columns={columns}
            dataSource={allUsers?.data}
            rowKey="_id"
            pagination={false}
          />
        )}
      </div>
      <div className="antd_custom_pagination flex justify-end mt-3">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={allUsers?.meta?.limit}
          total={allUsers?.meta?.total}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
