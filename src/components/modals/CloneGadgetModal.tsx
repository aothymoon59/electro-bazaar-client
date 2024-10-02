/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import EbButton from "../ui/EbButton";
import EBForm from "../ui/EBForm";
import EBInput from "../ui/EBInput";
import EBModal, { EBModalProps } from "../ui/EBModal";
import { FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAddGadgetMutation } from "../../redux/features/gadgets/gadgetsApi";
import EBSelect from "../ui/EBSelect";
import {
  connectivityOptions,
  operatingSystemOptions,
  powerSourceOptions,
  productCategoryOptions,
} from "../../constants/products";
import EBFileInput from "../ui/EBFileInput";
import { uploadImage } from "../../utils/global";

const CloneGadgetModal = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
}: EBModalProps) => {
  const [addGadget, { isLoading: addGadgetIsLoading }] = useAddGadgetMutation();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [fileInputData, setFileInputData] = useState<File | null>(null);

  const {
    name,
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
    productImage,
  } = modalData || {};
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
          cameraResolution: parseFloat(formVal.cameraResolution) || undefined,
          storageCapacity: parseFloat(formVal.storageCapacity) || undefined,
        },
        productImage: imgUrl || modalData.productImage,
      };

      const res = await addGadget(gadget).unwrap();
      if (res?.success == true) {
        setIsModalOpen(false);
        setImgUrl(null); // Clear the image URL
        setFileInputData(null); // Clear the file input data
        toast.success("Create variant successfully");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
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
    <EBModal
      title="Create a variant of this product"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalWidth={1200}
    >
      <EBForm onSubmit={onSubmit} defaultValues={defaultValues}>
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
            isUpdating={addGadgetIsLoading}
          />
          {/* Price  */}
          <EBInput
            type="number"
            name="price"
            label="Price"
            required
            placeholder="Enter product price"
            isUpdating={addGadgetIsLoading}
          />
          {/* quantity  */}
          <EBInput
            type="number"
            name="quantity"
            label="Quantity"
            required
            placeholder="Enter product quantity"
            isUpdating={addGadgetIsLoading}
          />
          {/* release date  */}
          <EBInput
            type="date"
            name="releaseDate"
            label="Release Date"
            required
            placeholder="Enter product release date"
            isUpdating={addGadgetIsLoading}
          />
          {/* Brand  */}
          <EBInput
            type="text"
            name="brand"
            label="Brand"
            required
            placeholder="Enter product brand"
            isUpdating={addGadgetIsLoading}
          />
          {/* Model  */}
          <EBInput
            type="text"
            name="modelNumber"
            label="Model"
            required
            placeholder="Enter product model"
            isUpdating={addGadgetIsLoading}
          />
          {/* Category  */}
          <EBSelect
            label="Category"
            name="category"
            options={productCategoryOptions}
            placeholder="Select product category"
            required
            isUpdating={addGadgetIsLoading}
          />
          {/* Operating System  */}
          <EBSelect
            label="Operating System"
            name="operatingSystem"
            options={operatingSystemOptions}
            placeholder="Select product operating system"
            isUpdating={addGadgetIsLoading}
          />
          {/* Connectivity  */}
          <EBSelect
            label="Connectivity"
            name="connectivity"
            options={connectivityOptions}
            placeholder="Select product connectivity"
            isUpdating={addGadgetIsLoading}
          />
          {/* Power Source  */}
          <EBSelect
            label="Power Source"
            name="powerSource"
            options={powerSourceOptions}
            placeholder="Select product power source"
            isUpdating={addGadgetIsLoading}
          />
          {/* Camera Resolution  */}
          <EBInput
            type="number"
            name="cameraResolution"
            label="Camera Resolution"
            placeholder="Enter Camera Resolution"
            isUpdating={addGadgetIsLoading}
          />
          {/* Storage Capacity  */}
          <EBInput
            type="number"
            name="storageCapacity"
            label="Storage Capacity"
            placeholder="Enter Storage Capacity"
            isUpdating={addGadgetIsLoading}
          />
        </div>

        <EbButton
          isLoading={addGadgetIsLoading}
          type="submit"
          className="custom-class w-full"
        >
          Create Variant
        </EbButton>
      </EBForm>
    </EBModal>
  );
};

export default CloneGadgetModal;
