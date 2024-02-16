/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin, Table, TableProps } from "antd";
import {
  useDeleteGadgetMutation,
  useDeleteMultipleMutation,
  useGetGadgetsQuery,
} from "../../redux/features/gadgets/gadgetsApi";
import { useState } from "react";
import { TQuery } from "../../types/query.types";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { TableRowSelection } from "antd/es/table/interface";
import { DataSourceItemType } from "antd/es/auto-complete";
import Swal from "sweetalert2";

interface GadgetData {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  category: string;
}

const ManageGadget = () => {
  const [query, setQuery] = useState<Partial<TQuery>>({});
  const { data, isLoading } = useGetGadgetsQuery(query);
  const [deleteGadget] = useDeleteGadgetMutation();
  const [deleteMultiple] = useDeleteMultipleMutation();
  const [ids, setIds] = useState<string[]>([]);

  const rowSelection: TableRowSelection<DataSourceItemType> = {
    onChange: (selectedRowKeys) => {
      const stringKeys = selectedRowKeys.map(String); // Convert each Key to a string
      setIds(stringKeys);
    },
  };

  const handleDeleteMultiple = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete these gadgets!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8850B3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then((result: any) => {
        if (result.isConfirmed) {
          deleteMultiple(ids);

          Swal.fire({
            title: "Deleted!",
            text: "Deleted Successfully.",
            icon: "success",
          });
        }
      });
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const columns: TableProps<GadgetData>["columns"] = [
    Table.SELECTION_COLUMN,
    {
      title: "Sl NO.",
      dataIndex: "key",
      key: "key",
      render: (_text, _record, index) => index + 1,
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
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Action 1",
      fixed: "right",
      width: 90,
      render: () => (
        <a>
          <FaEdit />
        </a>
      ),
    },
    {
      title: "Action 2",
      width: 90,
      render: (_text, record) => (
        <a
          onClick={() => {
            deleteGadget(record._id);
            toast.success("Gadget deleted successfully");
          }}
        >
          <FaTrash />
        </a>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h5 className="font-bold text-xl leading-[30px] text-primary-main">
          Gadgets Management
        </h5>
        {/* Gadget filtering */}
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={handleDeleteMultiple}
            className="primary-main-btn hover:bg-opacity-80 transition-all duration-200 ease-in-out"
          >
            Bulk Delete
          </button>
          <button className="primary-main-btn hover:bg-opacity-80 transition-all duration-200 ease-in-out">
            Filter
          </button>
        </div>
      </div>
      <hr className="border-primary-main my-[23px]" />
      <div className="overflow-x-auto sales-history">
        <Spin spinning={isLoading}>
          <Table
            className="custom-table"
            scroll={{ x: 768 }}
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={data?.data}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default ManageGadget;
