/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetAllGadgetsQuery } from "../../redux/features/gadgets/gadgetsApi";
import { Input, Spin } from "antd";
import SalesManagementModal from "../../components/form/SalesManagementModal";
import EmptyState from "../../components/ui/EmptyState";

const SalesManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [gadgetId, setGadgetId] = useState("");
  const [limit, setLimit] = useState(0);

  // Debounce logic
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  const { data, refetch, isLoading } =
    useGetAllGadgetsQuery(debouncedSearchText);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h5 className="font-bold text-xl leading-[30px] text-primary-main">
          Sales Management
        </h5>
        {/* search  */}
        <div className="relative w-full max-w-[460px]">
          <Input
            placeholder="Search"
            prefix={<FiSearch />}
            size="large"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <hr className="border-primary-main my-[23px]" />
      {isLoading && (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Spin spinning={true}></Spin>
        </div>
      )}
      {data?.data?.length === 0 && <EmptyState message="No data found" />}
      <div className="grid md:grid-cols-3 gap-5">
        {Array.isArray(data?.data) &&
          data?.data?.map((gadget: any) => {
            const {
              _id,
              name,
              price,
              releaseDate,
              brand,
              modelNumber,
              category,
              quantity,
            } = gadget;
            return (
              <div
                key={_id}
                className="card card-compact bg-primary-lighter shadow-md"
              >
                <div className="card-body">
                  <h2 className="card-title">{name}</h2>
                  <p className="flex gap-2 mt-2">
                    <span className="font-bold">Price:</span>
                    {price}
                  </p>
                  <p className="flex gap-2 mt-2">
                    <span className="font-bold">Quantity:</span>
                    {quantity}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-bold">Release Date:</span>

                    <span>{moment(releaseDate).format("DD/MM/YYYY")}</span>
                  </p>
                  <p className="flex gap-2">
                    <span className="font-bold">Brand:</span>
                    {brand}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-bold">Model:</span>
                    {modelNumber}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-bold">Category:</span>
                    {category}
                  </p>
                  <div className="card-actions justify-end mt-3">
                    <button
                      onClick={() => {
                        const salesManagementModal = document.getElementById(
                          "salesManagementModal"
                        ) as HTMLDialogElement | null;
                        salesManagementModal?.showModal();
                        setGadgetId(_id);
                        setLimit(quantity);
                      }}
                      className="primary-main-btn w-full hover:bg-opacity-80 transition-all duration-200 ease-in-out"
                    >
                      Sell Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <SalesManagementModal
        gadgetId={gadgetId}
        refetch={refetch}
        limit={limit}
      />
    </div>
  );
};

export default SalesManagement;
