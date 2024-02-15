/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSaleHistoryQuery } from "../../redux/features/sales/salesApi";
import moment from "moment";
import { Spin, Table, type TableProps } from "antd";

interface SaleData {
  _id: string;
  buyerName: string;
  buyDate: string;
  quantity: number;
}

const columns: TableProps<SaleData>["columns"] = [
  {
    title: "Sl NO.",
    dataIndex: "key",
    key: "key",
    render: (_text, _record, index) => index + 1,
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
  const [value, setValue] = useState("week");
  const { data, isLoading } = useGetSaleHistoryQuery(value);

  const handleHistoryFilter = (filteredVal: string) => {
    setValue(filteredVal);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h5 className="font-bold text-xl leading-[30px] text-primary-main">
          Sales History
        </h5>
        <div className="flex flex-wrap items-center gap-4">
          {/* Package filtering */}
          <select
            defaultValue={"week"}
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
      </div>
      <hr className="border-primary-main my-[23px]" />
      <div className="overflow-x-auto sales-history">
        <Spin spinning={isLoading}>
          <Table
            className="custom-table"
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={data?.data}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default SalesHistory;
