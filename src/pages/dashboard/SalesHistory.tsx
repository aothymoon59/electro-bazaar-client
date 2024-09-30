/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSaleHistoryQuery } from "../../redux/features/sales/salesApi";
import moment from "moment";
import { Pagination, Spin, Table, type TableProps } from "antd";

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

  const handleHistoryFilter = (filteredVal: string) => {
    setFilterValue(filteredVal);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h5 className="font-bold text-xl leading-[30px] text-primary-main">
          Sales History
        </h5>

        {/* data filtering */}
        <select
          defaultValue={""}
          onChange={(e) => handleHistoryFilter(e.target.value)}
          className="select select-bordered bg-primary-main border border-purple-300 text-white"
        >
          <option value={""}>All</option>
          <option value={"day"}>Daily</option>
          <option value={"week"}>Weekly</option>
          <option value={"month"}>Monthly</option>
          <option value={"year"}>Yearly</option>
        </select>
      </div>
      <hr className="border-primary-main my-[23px]" />
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
