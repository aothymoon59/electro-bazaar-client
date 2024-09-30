/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSaleHistoryQuery } from "../../redux/features/sales/salesApi";
import moment from "moment";
import { Pagination, Select, Spin, Table, type TableProps } from "antd";
import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";

interface SaleData {
  _id: string;
  buyerName: string;
  buyDate: string;
  quantity: number;
}

const columns: TableProps<SaleData>["columns"] = [
  {
    title: "Sl NO.",
    dataIndex: "slNo",
    key: "slNo",
    render: (text) => text,
  },
  {
    title: "Buyer Name",
    dataIndex: "buyerName",
    key: "buyerName",
    sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
  },
  {
    title: "Buy Date",
    dataIndex: "buyDate",
    key: "buyDate",
    render: (text) => moment(text).format("DD/MM/YYYY"),
    sorter: (a, b) => moment(a.buyDate).unix() - moment(b.buyDate).unix(),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
];

const SalesHistory = () => {
  const [page, setPage] = useState(1);
  const [filterVal, setFilterValue] = useState("");
  const { data: salesHistories, isLoading } = useGetSaleHistoryQuery([
    { name: "page", value: page },
    { name: "filterBy", value: filterVal },
    { name: "sort", value: "slNo" },
  ]);

  return (
    <div className="w-full">
      <PageHeader
        title="Sales History"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Sales History", isCurrent: true },
        ]}
        actions={
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={(value) => setFilterValue(value)}
            options={[
              { value: "", label: "All" },
              { value: "day", label: "Day" },
              { value: "week", label: "Weekly" },
              { value: "month", label: "Monthly" },
              { value: "year", label: "Yearly" },
            ]}
          />
        }
      />
      <div className="overflow-x-auto sales-history">
        <Spin spinning={isLoading}>
          <Table
            className="custom-table"
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={salesHistories?.data}
            rowKey="_id"
            pagination={false}
          />
        </Spin>
      </div>
      <div className="antd_custom_pagination flex justify-end mt-3">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={salesHistories?.meta?.limit}
          total={salesHistories?.meta?.total}
        />
      </div>
    </div>
  );
};

export default SalesHistory;
