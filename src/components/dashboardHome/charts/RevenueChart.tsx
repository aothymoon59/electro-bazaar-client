import { useState } from "react";
import ReactApexChart from "react-apexcharts"; // Import ReactApexChart if not already imported
import { FaArrowUp } from "react-icons/fa6";

const RevenueChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Profit",
        data: [80, 77, 57, 87, 61, 83, 91, 95, 66],
      },
      {
        name: "Loss",
        data: [76, 85, 65, 78, 88, 82, 43, 29, 94],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (Amount)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  return (
    <div className="h-[450px] mt-6 bg-primary-lighter p-5 flex flex-col items-start gap-5">
      <div>
        <h3 className="text-lg font-semibold">Total Revenue</h3>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-bold">$ 20.4K</p>{" "}
          <span className="text-green-700">
            <FaArrowUp /> 5% than last month
          </span>
        </div>
      </div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={300}
        className="w-full"
      />
    </div>
  );
};

export default RevenueChart;
