/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useGetSingleGadgetQuery,
  useUpdateGadgetMutation,
} from "../../redux/features/gadgets/gadgetsApi";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import moment from "moment";
import EBInput from "../../components/ui/EBInput";
import EBForm from "../../components/ui/EBForm";
import EBSelect from "../../components/ui/EBSelect";
import {
  connectivityOptions,
  operatingSystemOptions,
  powerSourceOptions,
  productCategoryOptions,
} from "../../constants/products";
import EbButton from "../../components/ui/EbButton";
import CloneGadgetModal from "../../components/modals/CloneGadgetModal";
import PageHeader from "../../components/ui/PageHeader";
import { FaHome } from "react-icons/fa";
import EBFileInput from "../../components/ui/EBFileInput";
import { uploadImage } from "../../utils/global";

const UpdateGadget = () => {
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicateModalData, setDuplicateModalData] = useState({});
  const { id } = useParams();
  const { data, isLoading: isGadgetLoading } = useGetSingleGadgetQuery(id, {
    skip: !id,
  });
  const [updateGadget, { isLoading: isGadgetUpdating }] =
    useUpdateGadgetMutation();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [fileInputData, setFileInputData] = useState<File | null>(null);

  const {
    name,
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
  } = data?.data || {};
  const { cameraResolution, storageCapacity } = features || {};

  const [formattedReleaseDate, setFormattedReleaseDate] = useState("");

  useEffect(() => {
    // Format the release date using Moment.js
    const formattedDate = moment(releaseDate).format("YYYY-MM-DD");
    setFormattedReleaseDate(formattedDate);
  }, [releaseDate]);

  const defaultValues = {
    name: name,
    price: price,
    quantity: quantity,
    releaseDate: formattedReleaseDate,
    brand: brand,
    modelNumber: modelNumber,
    category: category,
    operatingSystem: operatingSystem,
    connectivity: connectivity,
    powerSource: powerSource,
    cameraResolution: cameraResolution,
    storageCapacity: storageCapacity,
    productImage: productImage,
  };

  const onSubmit = async (formVal: FieldValues) => {
    try {
      const gadget = {
        name: formVal.name,
        price: parseFloat(formVal.price),
        quantity: parseInt(formVal.quantity),
        releaseDate: formVal.releaseDate,
        brand: formVal.brand,
        modelNumber: formVal.modelNumber,
        category: formVal.category,
        operatingSystem: formVal.operatingSystem,
        connectivity: formVal.connectivity,
        powerSource: formVal.powerSource,
        features: {
          cameraResolution: parseFloat(data.cameraResolution) || undefined,
          storageCapacity: parseFloat(data.storageCapacity) || undefined,
        },
        productImage: imgUrl || data.productImage,
      };

      const res = await updateGadget({ id, payload: gadget }).unwrap();
      if (res?.success === true) {
        setImgUrl(null); // Clear the image URL
        setFileInputData(null); // Clear the file input data
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.errorMessage || error?.data?.message);
    }
  };

  const handleCloneGadget = (gadget: any) => {
    setIsDuplicateModalOpen(true);
    setDuplicateModalData(gadget);
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      uploadImage(file, setImgUrl);
      setFileInputData(file);
    } else {
      setFileInputData(null); // Reset when no file is selected
    }
  };

  return (
    <div className="w-full">
      <PageHeader
        title="Update Gadget"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Manage Gadgets", link: "/gadgets", icon: null },
          { label: name, isCurrent: true },
        ]}
        actions={
          <EbButton onClick={() => handleCloneGadget(data?.data)}>
            Create Variant
          </EbButton>
        }
      />
      <EBForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        isGadgetLoading={isGadgetLoading}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* image  */}
          <EBFileInput
            label="Product Image*"
            fileInputData={fileInputData}
            onChange={handleImageUpload}
          />
          {/* name  */}
          <EBInput
            type="text"
            name="name"
            label="Name"
            required
            placeholder="Enter product name"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Price  */}
          <EBInput
            type="number"
            name="price"
            label="Price"
            required
            placeholder="Enter product price"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* quantity  */}
          <EBInput
            type="number"
            name="quantity"
            label="Quantity"
            required
            placeholder="Enter product quantity"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* release date  */}
          <EBInput
            type="date"
            name="releaseDate"
            label="Release Date"
            required
            placeholder="Enter product release date"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Brand  */}
          <EBInput
            type="text"
            name="brand"
            label="Brand"
            required
            placeholder="Enter product brand"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Model  */}
          <EBInput
            type="text"
            name="modelNumber"
            label="Model"
            required
            placeholder="Enter product model"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Category  */}
          <EBSelect
            label="Category"
            name="category"
            options={productCategoryOptions}
            placeholder="Select product category"
            required
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Operating System  */}
          <EBSelect
            label="Operating System"
            name="operatingSystem"
            options={operatingSystemOptions}
            placeholder="Select product operating system"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Connectivity  */}
          <EBSelect
            label="Connectivity"
            name="connectivity"
            options={connectivityOptions}
            placeholder="Select product connectivity"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Power Source  */}
          <EBSelect
            label="Power Source"
            name="powerSource"
            options={powerSourceOptions}
            placeholder="Select product power source"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Camera Resolution  */}
          <EBInput
            type="number"
            name="cameraResolution"
            label="Camera Resolution"
            placeholder="Enter Camera Resolution"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
          {/* Storage Capacity  */}
          <EBInput
            type="number"
            name="storageCapacity"
            label="Storage Capacity"
            placeholder="Enter Storage Capacity"
            isLoading={isGadgetLoading}
            isUpdating={isGadgetUpdating}
          />
        </div>

        <EbButton
          isLoading={isGadgetUpdating}
          type="submit"
          className="custom-class w-full"
        >
          Update Gadget
        </EbButton>
      </EBForm>
      <CloneGadgetModal
        isModalOpen={isDuplicateModalOpen}
        setIsModalOpen={setIsDuplicateModalOpen}
        modalData={duplicateModalData || {}}
      />
    </div>
  );
};

export default UpdateGadget;
