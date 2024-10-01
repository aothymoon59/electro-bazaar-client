import { FaArrowUp } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCircleDot } from "react-icons/fa6";

export const RevenueBarChart = () => {
  const data = [
    {
      name: "Jan",
      profit: 4000,
      loss: 2400,
    },
    {
      name: "Feb",
      profit: 3000,
      loss: 1398,
    },
    {
      name: "Mar",
      profit: 5600,
      loss: 700,
    },
    {
      name: "Apr",
      profit: 2780,
      loss: 3908,
    },
    {
      name: "May",
      profit: 1200,
      loss: 800,
    },
    {
      name: "Jun",
      profit: 2390,
      loss: 3800,
    },
    {
      name: "Jul",
      profit: 3990,
      loss: 3200,
    },
    {
      name: "Aug",
      profit: 3190,
      loss: 960,
    },
    {
      name: "Sep",
      profit: 4490,
      loss: 5300,
    },
    {
      name: "Oct",
      profit: 2490,
      loss: 2300,
    },
    {
      name: "Nov",
      profit: 5490,
      loss: 4300,
    },
    {
      name: "Dec",
      profit: 1490,
      loss: 300,
    },
  ];

  return (
    <div className="ebChart h-[450px] xl:h-[550px] mt-6 bg-primary-lighter p-5 flex flex-col items-start gap-5">
      <div className="flex items-center justify-between gap-2 flex-wrap w-full">
        <div>
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold">$20.4K</p>{" "}
            <span className="text-green-600">
              <FaArrowUp /> 5% than last month
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 text-[#008FFB]">
            <FaCircleDot /> <span className="font-medium">Profit</span>
          </div>
          <div className="flex items-center gap-1 text-[#EF4444]">
            <FaCircleDot /> <span className="font-medium">Loss</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.1)" }}
            animationEasing="ease"
            animationDuration={500}
          />
          <Bar
            dataKey="profit"
            fill="#008FFB"
            activeBar={<Rectangle fill="#008efbc3" stroke="#0879cf" />}
          />
          <Bar
            dataKey="loss"
            fill="#EF4444"
            activeBar={<Rectangle fill="#ef4444c3" stroke="#ef4444" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
