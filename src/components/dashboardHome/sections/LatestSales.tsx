/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useGetSaleHistoryQuery } from "../../redux/features/sales/salesApi";
import moment from "moment";
import { Spin, Table, type TableProps } from "antd";
import { useGetSaleHistoryQuery } from "../../../redux/features/sales/salesApi";

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

const LatestSales = () => {
  const { data: salesHistories, isLoading } = useGetSaleHistoryQuery([
    { name: "sort", value: "-slNo" },
    { name: "limit", value: 10 },
  ]);

  return (
    <div className="w-full mt-6 p-5 bg-primary-lighter">
      <h2 className="text-lg font-semibold text-left mb-6">Latest Sales</h2>
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
    </div>
  );
};

export default LatestSales;
