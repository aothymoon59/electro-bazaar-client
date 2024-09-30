/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Spin, Table, TableProps } from "antd";
import {
  useDeleteGadgetMutation,
  useDeleteMultipleMutation,
  useGetAllGadgetsQuery,
} from "../../redux/features/gadgets/gadgetsApi";
import { useState } from "react";
import { TQuery } from "../../types/query.types";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { TableRowSelection } from "antd/es/table/interface";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import FilterDrawer from "../../components/form/FilterDrawer";

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

const ManageGadget = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<Partial<TQuery>>({
    minPrice: null,
    maxPrice: null,
    releaseDate: "",
    brand: "",
    modelNumber: "",
    category: "",
    operatingSystem: [],
    connectivity: [],
    powerSource: [],
    cameraResolution: null,
    storage: null,
  });

  console.log(query);
  const { data: allGadgets, isLoading } = useGetAllGadgetsQuery([
    { name: "page", value: page },
    { name: "minPrice", value: query.minPrice },
    { name: "maxPrice", value: query.maxPrice },
    { name: "releaseDate", value: query.releaseDate },
    { name: "brand", value: query.brand },
    { name: "modelNumber", value: query.modelNumber },
    { name: "category", value: query.category },
    ...(query?.operatingSystem?.length > 0
      ? [{ name: "operatingSystem", value: query.operatingSystem.join(",") }]
      : []),
    ...(query?.connectivity?.length > 0
      ? [{ name: "connectivity", value: query.connectivity.join(",") }]
      : []),
    ...(query?.powerSource?.length > 0
      ? [{ name: "powerSource", value: query.powerSource.join(",") }]
      : []),
    { name: "cameraResolution", value: query.cameraResolution },
    { name: "storage", value: query.storage },
  ]);
  const [deleteGadget] = useDeleteGadgetMutation();
  const [deleteMultiple] = useDeleteMultipleMutation();
  const [ids, setIds] = useState<string[]>([]);

  const rowSelection: TableRowSelection<GadgetData> = {
    onChange: (selectedRowKeys) => {
      const stringKeys = selectedRowKeys.map(String);
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
        confirmButtonColor: "#2A2F4F",
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

  const handleSingleDelete = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this gadget!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2A2F4F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then((result: any) => {
        if (result.isConfirmed) {
          deleteGadget(id);

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
      width: 100,
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
      title: "Actions",
      fixed: "right",
      width: 100,
      render: (_text, record) => (
        <div className="flex justify-center items-center gap-5">
          <Link to={`/gadgets/update/${record._id}`}>
            <FaEdit />
          </Link>
          <a onClick={() => handleSingleDelete(record._id)}>
            <FaTrash className="text-red-500" />
          </a>
        </div>
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
          {ids?.length > 0 && (
            <button
              onClick={handleDeleteMultiple}
              className="primary-main-btn bg-red-500 hover:bg-opacity-80 transition-all duration-200 ease-in-out"
            >
              Delete Selected
            </button>
          )}

          <FilterDrawer setQuery={setQuery} query={query} />
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
            dataSource={allGadgets?.data}
            rowKey="_id"
            pagination={false}
          />
        </Spin>
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

export default ManageGadget;
