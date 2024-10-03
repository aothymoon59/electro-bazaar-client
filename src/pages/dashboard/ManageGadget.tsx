/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table, TableProps } from "antd";
import {
  useDeleteGadgetMutation,
  useDeleteMultipleMutation,
  // useGetAllGadgetsQuery,
  useGetManageGadgetsQuery,
} from "../../redux/features/gadgets/gadgetsApi";
import { useState } from "react";
import { TQuery } from "../../types/query.types";
import moment from "moment";
import { FaEdit, FaEye, FaHome, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { TableRowSelection } from "antd/es/table/interface";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import FilterDrawer from "../../components/form/FilterDrawer";
import PageHeader from "../../components/ui/PageHeader";
import AntdTableSkeleton from "../../components/global/loaders/tableskeleton/AntdTableSkeleton";

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

  const handleProductQuery = (query: Partial<TQuery>) => {
    const payload = [
      { name: "page", value: page },
      { name: "minPrice", value: query.minPrice },
      { name: "maxPrice", value: query.maxPrice },
      { name: "releaseDate", value: query.releaseDate },
      { name: "brand", value: query.brand },
      { name: "modelNumber", value: query.modelNumber },
      { name: "category", value: query.category },
      { name: "cameraResolution", value: query.cameraResolution },
      { name: "storage", value: query.storage },
    ];
    if (query?.operatingSystem?.length) {
      payload.push({
        name: "operatingSystem",
        value: query.operatingSystem.join(","),
      });
    }

    if (query?.connectivity?.length) {
      payload.push({
        name: "connectivity",
        value: query.connectivity.join(","),
      });
    }
    if (query?.powerSource?.length) {
      payload.push({
        name: "powerSource",
        value: query.powerSource.join(","),
      });
    }
    return payload;
  };

  const { data: allGadgets, isLoading: isAllGadgetsLoading } =
    useGetManageGadgetsQuery(handleProductQuery(query), {
      refetchOnMountOrArgChange: true, // Refetch data on every visit or argument change
      refetchOnFocus: true, // Optional: Refetch when the user focuses on the page
      refetchOnReconnect: true, // Optional: Refetch when user reconnects
    });
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
          deleteMultiple(ids)
            .unwrap()
            .then((res) => {
              if (res?.success === true) {
                toast.success(res?.message);
              }
            })
            .catch((err) => {
              toast.error(err.data.message);
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
          deleteGadget(id)
            .unwrap()
            .then((res) => {
              if (res?.success === true) {
                toast.success(res?.message);
              }
            })
            .catch((err) => {
              toast.error(err.data.message);
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
      title: "Gadget Image",
      dataIndex: "productImage",
      key: "productImage",
      render: (text) => (
        <img
          src={text}
          alt="gadget"
          className="w-20 h-20 object-cover object-center"
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
          <a onClick={() => handleSingleDelete(record._id)}>
            <FaTrash size={14} className="text-red-500" />
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <PageHeader
        title="Manage Gadget"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Manage Gadget", isCurrent: true },
        ]}
        actions={
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
        }
      />
      <div className="overflow-x-auto sales-history">
        {isAllGadgetsLoading ? (
          <AntdTableSkeleton />
        ) : (
          <Table
            className="custom-table"
            scroll={{ x: 1024 }}
            columns={columns}
            rowSelection={{ ...rowSelection }}
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

export default ManageGadget;
