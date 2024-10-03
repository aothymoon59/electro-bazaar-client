/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetAllGadgetsQuery } from "../../redux/features/gadgets/gadgetsApi";
import { Empty, Input, Pagination } from "antd";
import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import ProductCardSkeleton from "../../components/global/loaders/cardSkeleton/ProductCardSkeleton";
import ProductCard from "../../components/dashBoardShop/ProductCard";

const ShopManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
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

  const { data: allGadgets, isLoading: isAllGadgetsLoading } =
    useGetAllGadgetsQuery(
      [
        { name: "page", value: page },
        { name: "limit", value: 12 },
        { name: "searchTerm", value: debouncedSearchText },
      ],
      {
        refetchOnMountOrArgChange: true, // Refetch data on every visit or argument change
        refetchOnFocus: true, // Optional: Refetch when the user focuses on the page
        refetchOnReconnect: true, // Optional: Refetch when user reconnects
      }
    );

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full">
      <PageHeader
        title="Shop"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Shop", isCurrent: true },
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
      {isAllGadgetsLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.isArray(allGadgets?.data) &&
            allGadgets?.data?.map((gadget: any) => {
              return <ProductCard key={gadget?._id} gadget={gadget} />;
            })}
        </div>
      )}
      {allGadgets?.data?.length === 0 && (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Empty />
        </div>
      )}

      <div className="antd_custom_pagination flex justify-center mt-5">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={allGadgets?.meta?.limit}
          total={allGadgets?.meta?.total}
        />
      </div>
    </div>
  );
};

export default ShopManagement;
