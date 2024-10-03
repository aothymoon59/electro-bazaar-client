import { Card, Skeleton } from "antd";

const ProductCardSkeleton = () => {
  return (
    <Card
      className="w-full"
      cover={<Skeleton.Image className="w-[95%] mx-auto mt-5 h-[170px]" />}
    >
      <Skeleton active paragraph={{ rows: 3 }} />
      <div className="mt-5 flex justify-end">
        <Skeleton.Button active style={{ width: "100%" }} />
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
