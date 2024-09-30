const DashboardMetrics = () => {
  const metrics = [
    {
      title: "Total Sales",
      amount: "$20.4K",
      description: "We have sold 123 items",
      color: "bg-blue-500",
    },
    {
      title: "Total User",
      amount: "238",
      description: "All users registered",
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      amount: "$18.2K",
      description: "Available to payout",
      color: "bg-orange-500",
    },
    {
      title: "Total Products",
      amount: "123",
      description: "Available to sell",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="flex justify-between bg-primary-main text-white p-4 rounded-lg w-full"
        >
          <div className="flex flex-col items-start">
            <div className="text-sm font-medium">{metric.title}</div>
            <div className="text-3xl font-bold my-2">{metric.amount}</div>
            <div className="text-xs">{metric.description}</div>
          </div>
          <div
            className={`mt-4 w-16 h-16 rounded-full flex items-center justify-center ${metric.color}`}
          >
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
