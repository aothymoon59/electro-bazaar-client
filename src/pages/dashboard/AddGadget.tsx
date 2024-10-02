/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useAddGadgetMutation } from "../../redux/features/gadgets/gadgetsApi";
import EBInput from "../../components/ui/EBInput";
import EBForm from "../../components/ui/EBForm";
import EBSelect from "../../components/ui/EBSelect";
import {
  connectivityOptions,
  operatingSystemOptions,
  powerSourceOptions,
  productCategoryOptions,
} from "../../constants/products";
import { useState } from "react";
import { FaCloudDownloadAlt, FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import { Form, Input } from "antd";
import { uploadImage } from "../../utils/global";

const AddGadget = () => {
  const [addGadget, { isLoading }] = useAddGadgetMutation();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  // const [isUpload, setIsUpload] = useState<boolean>(false);

  const onSubmit = async (data: FieldValues) => {
    if (!imgUrl) {
      toast.error("Please upload product image.");
      return;
    }

    try {
      const gadget = {
        name: data.name,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        releaseDate: data.releaseDate,
        brand: data.brand,
        modelNumber: data.modelNumber,
        category: data.category,
        operatingSystem: data.operatingSystem,
        connectivity: data.connectivity,
        powerSource: data.powerSource,
        features: {
          cameraResolution: parseFloat(data.cameraResolution) || undefined,
          storageCapacity: parseFloat(data.storageCapacity) || undefined,
        },
        productImage: imgUrl,
      };

      const res = await addGadget(gadget).unwrap();
      if (res?.success == true) {
        setImgUrl(null); // Clear the image URL
      }
      toast.success(res.message);
      return res; // Return the response to EBForm
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  // Handler for file input change
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // setIsUpload(true); // Start uploading
      uploadImage(e.target.files[0], setImgUrl);
    }
  };

  return (
    <div className="w-full">
      <PageHeader
        title="Add Gadget"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Add Gadget", isCurrent: true },
        ]}
      />
      <EBForm onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* name  */}
          <EBInput
            type="text"
            name="name"
            label="Name"
            required
            placeholder="Enter product name"
          />
          {/* image  */}
          <Controller
            name="productImage"
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <Form.Item label={`Product Image*`}>
                  <Input
                    size="large"
                    type="file"
                    {...field}
                    onChange={handleImageUpload}
                    suffix={<FaCloudDownloadAlt />}
                  />
                </Form.Item>
              );
            }}
          />
          {/* Price  */}
          <EBInput
            type="number"
            name="price"
            label="Price"
            required
            placeholder="Enter product price"
          />
          {/* quantity  */}
          <EBInput
            type="number"
            name="quantity"
            label="Quantity"
            required
            placeholder="Enter product quantity"
          />
          {/* release date  */}
          <EBInput
            type="date"
            name="releaseDate"
            label="Release Date"
            required
            placeholder="Enter product release date"
          />
          {/* Brand  */}
          <EBInput
            type="text"
            name="brand"
            label="Brand"
            required
            placeholder="Enter product brand"
          />
          {/* Model  */}
          <EBInput
            type="text"
            name="modelNumber"
            label="Model"
            required
            placeholder="Enter product model"
          />
          {/* Category  */}
          <EBSelect
            label="Category"
            name="category"
            options={productCategoryOptions}
            placeholder="Select product category"
            required
          />
          {/* Operating System  */}
          <EBSelect
            label="Operating System"
            name="operatingSystem"
            options={operatingSystemOptions}
            placeholder="Select product operating system"
          />
          {/* Connectivity  */}
          <EBSelect
            label="Connectivity"
            name="connectivity"
            options={connectivityOptions}
            placeholder="Select product connectivity"
          />
          {/* Power Source  */}
          <EBSelect
            label="Power Source"
            name="powerSource"
            options={powerSourceOptions}
            placeholder="Select product power source"
          />
          {/* Camera Resolution  */}
          <EBInput
            type="number"
            name="cameraResolution"
            label="Camera Resolution"
            placeholder="Enter Camera Resolution"
          />
          {/* Storage Capacity  */}
          <EBInput
            type="number"
            name="storageCapacity"
            label="Storage Capacity"
            placeholder="Enter Storage Capacity"
          />
        </div>

        <button
          className={`primary-main-btn w-full hover:bg-opacity-80 transition-all duration-200 ease-in-out ${
            isLoading && "cursor-not-allowed"
          }`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <ImSpinner9 className="m-auto animate-spin" />
          ) : (
            "Add Product"
          )}
        </button>
      </EBForm>
    </div>
  );
};

export default AddGadget;
