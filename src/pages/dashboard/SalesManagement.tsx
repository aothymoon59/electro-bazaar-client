/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetAllGadgetsQuery } from "../../redux/features/gadgets/gadgetsApi";
import { Empty, Input, Pagination, Spin } from "antd";
import EbButton from "../../components/ui/EbButton";
import SalesManageModal from "../../components/modals/SalesManageModal";
import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";

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
      <PageHeader
        title="Sales Management"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Sales Management", isCurrent: true },
        ]}
        actions={
          <div className="w-full max-w-[460px]">
            <Input
              placeholder="Search"
              prefix={<FiSearch />}
              size="large"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        }
      />
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
              productImage,
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
                <div className="p-3">
                  <div className="bg-white w-full h-[200px] p-3 flex justify-center rounded-md">
                    <img
                      src={productImage}
                      alt={name}
                      className="rounded-xl h-[170px]"
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="card-title">{name}</h2>
                    <p className="flex gap-2">
                      <span className="font-bold">Price:</span>${price}
                    </p>
                    <p className="flex gap-2">
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
