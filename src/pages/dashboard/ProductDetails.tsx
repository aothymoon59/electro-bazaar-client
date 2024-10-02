import { useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import { FaHome } from "react-icons/fa";
import { useGetSingleGadgetQuery } from "../../redux/features/gadgets/gadgetsApi";
import moment from "moment";
import { Spin } from "antd";

// TODO: design will be updateDoc, its just demo for check data
const ProductDetails = () => {
  const { id: productId } = useParams();
  const { data: productFromAPi, isLoading: isGadgetLoading } =
    useGetSingleGadgetQuery(productId, {
      skip: !productId,
    });

  const {
    name: productName,
    productImage,
    price,
    quantity,
    releaseDate,
    brand,
    modelNumber,
    category,
    operatingSystem,
    connectivity,
    powerSource,
    features,
  } = productFromAPi?.data || {};
  const { cameraResolution, storageCapacity } = features || {};
  return (
    <>
      {isGadgetLoading && (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Spin spinning={true}></Spin>
        </div>
      )}
      <div className="w-full">
        <PageHeader
          title="Update Gadget"
          breadcrumbs={[
            { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
            { label: "Manage Gadgets", link: "/gadgets", icon: null },
            { label: productName, isCurrent: true },
          ]}
        />
        <div className="grid grid-cols-2 gap-8">
          <div className="h-[600px] w-full bg-white rounded-lg p-5 flex justify-center">
            <img
              src={productImage}
              alt={productName}
              className="h-full mx-auto"
            />
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-semibold">{productName}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">${price}</p>
              <p className="text-2xl font-semibold text-slate-400 line-through">
                ${price + 100}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">Quantity: {quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">
                Release Date: {moment(releaseDate).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">Brand: {brand}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">
                Model Number: {modelNumber}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">Category: {category}</p>
            </div>
            {operatingSystem && (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold">
                  Operating System: {operatingSystem}
                </p>
              </div>
            )}
            {connectivity && (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold">
                  Connectivity: {connectivity}
                </p>
              </div>
            )}
            {powerSource && (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold">
                  Power Source: {powerSource}
                </p>
              </div>
            )}
            {cameraResolution && (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold">
                  Camera Resolution: {cameraResolution}
                </p>
              </div>
            )}
            {storageCapacity && (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold">
                  Storage Capacity: {storageCapacity}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
