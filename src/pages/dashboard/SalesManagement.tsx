/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetAllGadgetsQuery } from "../../redux/features/gadgets/gadgetsApi";
import { Empty, Input, Pagination, Spin } from "antd";
import EbButton from "../../components/ui/EbButton";
import SalesManageModal from "../../components/modals/SalesManageModal";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const SalesManagement = () => {
  const [isSalesManagementModalOpen, setIsSalesManagementModalOpen] =
    useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [gadgetId, setGadgetId] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [page, setPage] = useState(1);

  // Debounce logic
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  const { data: allGadgets, isLoading } = useGetAllGadgetsQuery([
    { name: "page", value: page },
    { name: "limit", value: 9 },
    { name: "searchTerm", value: debouncedSearchText },
  ]);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h5 className="font-bold text-xl leading-[30px] text-primary-main">
            Sales Management
          </h5>
          <div className="flex items-center gap-1 sm:gap-2 pt-3">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-primary-main"
            >
              <FaHome />
              ElectroBazaar
            </Link>
            <IoIosArrowForward className="mx-1 sm:mx-2" />
            <div className="text-slate-400">Sales Management</div>
          </div>
        </div>
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
      {allGadgets?.data?.length === 0 && (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Empty />
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-5">
        {Array.isArray(allGadgets?.data) &&
          allGadgets?.data?.map((gadget: any) => {
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
                    <EbButton
                      className="primary-main-btn w-full"
                      onClick={() => {
                        setIsSalesManagementModalOpen(true);
                        setGadgetId(_id);
                        setProductQuantity(quantity);
                      }}
                    >
                      Sell Now
                    </EbButton>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="antd_custom_pagination flex justify-center mt-5">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={allGadgets?.meta?.limit}
          total={allGadgets?.meta?.total}
        />
      </div>
      <SalesManageModal
        isModalOpen={isSalesManagementModalOpen}
        setIsModalOpen={setIsSalesManagementModalOpen}
        gadgetId={gadgetId}
        limit={productQuantity}
      />
    </div>
  );
};

export default SalesManagement;
