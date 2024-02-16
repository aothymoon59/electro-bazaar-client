import { MdOutlineSearchOff } from "react-icons/md";
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="h-[60vh] w-full gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl font-bold text-primary-main">
      <MdOutlineSearchOff />
      <p className={``}>{message}</p>
    </div>
  );
};

export default EmptyState;
