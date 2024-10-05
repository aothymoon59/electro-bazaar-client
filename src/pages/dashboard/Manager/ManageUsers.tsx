/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table, TableProps } from "antd";
import { useState } from "react";

import moment from "moment";
import { FaEdit, FaEye, FaHome, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";
import PageHeader from "../../../components/ui/PageHeader";
import AntdTableSkeleton from "../../../components/global/loaders/tableskeleton/AntdTableSkeleton";

interface GadgetData {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  cameraResolution: number;
  category: string;
}

const ManageUsers = () => {
  const [page, setPage] = useState(1);

  const columns: TableProps<GadgetData>["columns"] = [
    Table.SELECTION_COLUMN,
    {
      title: "Sl NO.",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Gadget Image",
      dataIndex: "productImage",
      key: "productImage",
      render: (text) => (
        <img
          src={text}
          alt="gadget"
          className="w-12 h-12 object-cover object-center rounded-md"
        />
      ),
      align: "center",
    },
    {
      title: "Gadgets Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 130,
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 130,
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      sorter: (a, b) =>
        moment(a.releaseDate).unix() - moment(b.releaseDate).unix(),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Actions",
      fixed: "right",
      width: 150,
      render: (_text, record) => (
        <div className="flex justify-start items-center gap-3">
          <Link to={`/gadgets/view/${record._id}`}>
            <FaEye size={18} />
          </Link>
          <Link to={`/gadgets/update/${record._id}`}>
            <FaEdit size={16} />
          </Link>
          <a>
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
        {isAllGadgetsLoading ? (
          <AntdTableSkeleton />
        ) : (
          <Table
            className="custom-table"
            scroll={{ x: 1024 }}
            columns={columns}
            dataSource={allGadgets?.data}
            rowKey="_id"
            pagination={false}
          />
        )}
      </div>
      <div className="antd_custom_pagination flex justify-end mt-3">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={allGadgets?.meta?.limit}
          total={allGadgets?.meta?.total}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
