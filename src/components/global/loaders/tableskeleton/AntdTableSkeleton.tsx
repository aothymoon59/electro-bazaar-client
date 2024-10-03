import { Skeleton } from "antd";

const AntdTableSkeleton = ({
  columns = 6,
  rows = 5,
}: {
  columns?: number;
  rows?: number;
}) => {
  const getSkeletonRow = (key: number) => (
    <div
      key={key}
      className={`eb_skeleton_row ${key % 2 === 1 ? "eb_odd" : "eb_even"}`}
    >
      {Array.from({ length: columns }).map((_, colIndex) => (
        <Skeleton.Input
          key={colIndex}
          style={{ width: "100%", height: "18px", flex: 1 }}
          active
          size="small"
        />
      ))}
    </div>
  );

  return (
    <div className="eb_skeleton_table">
      {Array.from({ length: rows }).map((_, rowIndex) =>
        getSkeletonRow(rowIndex)
      )}
    </div>
  );
};

export default AntdTableSkeleton;
