import { useState } from "react";
import ReactApexChart from "react-apexcharts"; // Import ReactApexChart if not already imported

const SoldPieChart = () => {
  const [chartData] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div className="h-[450px] xl:h-[550px] mt-6 bg-primary-lighter p-5 flex flex-col items-start gap-5">
      <div>
        <h3 className="text-lg font-semibold">Most Sold Items </h3>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          className="w-full"
          height={300}
        />
      </div>
    </div>
  );
};

export default SoldPieChart;
