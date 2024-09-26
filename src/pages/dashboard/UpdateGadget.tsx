/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useGetSingleGadgetQuery,
  useUpdateGadgetMutation,
} from "../../redux/features/gadgets/gadgetsApi";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import moment from "moment";
import DuplicateGadgetModal from "../../components/form/DuplicateGadgetModal";
import EBInput from "../../components/ui/EBInput";
import EBForm from "../../components/ui/EBForm";

// TODO: need to work here
const UpdateGadget = () => {
  const { id } = useParams();
  const { data } = useGetSingleGadgetQuery(id, { skip: !id });
  const [updateGadget, { isLoading }] = useUpdateGadgetMutation();
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
  } = data?.data || {};
  const { cameraResolution, storageCapacity } = features || {};

  // console.log(data?.data);

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
  };

  // const { register, handleSubmit } = useForm();

  const onSubmit = async (formVal: FieldValues) => {
    try {
      const gadget = {
        name: formVal.name || name,
        price: parseFloat(formVal.price) || price,
        quantity: parseInt(formVal.quantity) || quantity,
        releaseDate: formVal.release || releaseDate,
        brand: formVal.brand || brand,
        modelNumber: formVal.model || modelNumber,
        category: formVal.category || category,
        operatingSystem: formVal.os || operatingSystem,
        connectivity: formVal.connectivity || connectivity,
        powerSource: formVal.power || powerSource,
        features: {
          cameraResolution: parseFloat(formVal.camera) || cameraResolution,
          storageCapacity: parseFloat(formVal.storage) || storageCapacity,
        },
      };

      const res = await updateGadget({ id, payload: gadget }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  // const handlePreventWheel = (e: any) => {
  //   e.target.addEventListener(
  //     "wheel",
  //     function (e: any) {
  //       e.preventDefault();
  //     },
  //     { passive: false }
  //   );
  // };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h5 className="font-bold text-xl leading-[30px] text-primary-main">
          Update Gadget
        </h5>
        <button
          onClick={() => {
            const duplicateGadgetModal = document.getElementById(
              "duplicateGadgetModal"
            ) as HTMLDialogElement | null;
            duplicateGadgetModal?.showModal();
          }}
          className="primary-main-btn hover:bg-opacity-80 transition-all duration-200 ease-in-out mt-4"
        >
          Duplicate Gadget
        </button>
      </div>
      <hr className="border-primary-main my-[23px]" />
      <EBForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* name  */}
          <EBInput
            type="text"
            name="name"
            label="Name"
            required
            placeholder="Enter product name"
          />
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: false })}
              name="name"
              defaultValue={name}
              className="input input-bordered w-full"
            />
          </div> */}
          {/* Price  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: false })}
              name="price"
              defaultValue={price}
              className="input input-bordered w-full"
              onFocus={(e) => handlePreventWheel(e)}
            />
          </div> */}
          {/* quantity  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Quantity*</span>
            </label>
            <input
              type="number"
              {...register("quantity", { required: false })}
              name="quantity"
              defaultValue={quantity}
              className="input input-bordered w-full"
              onFocus={(e) => handlePreventWheel(e)}
            />
          </div> */}
          {/* release date  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Release Date*</span>
            </label>
            <input
              type="date"
              {...register("release", { required: false })}
              name="release"
              defaultValue={formattedReleaseDate}
              placeholder="Enter Release Date here"
              className="input input-bordered w-full"
            />
          </div> */}
          {/* Brand  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Brand*</span>
            </label>
            <input
              type="text"
              {...register("brand", { required: false })}
              name="brand"
              defaultValue={brand}
              className="input input-bordered w-full"
            />
          </div> */}
          {/* Model Number  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Model Number*</span>
            </label>
            <input
              type="text"
              {...register("model", { required: false })}
              name="model"
              defaultValue={modelNumber}
              className="input input-bordered w-full"
            />
          </div> */}
          {/* Category  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Category*</span>
            </label>
            <input
              type="text"
              {...register("category", { required: false })}
              name="category"
              defaultValue={category}
              className="input input-bordered w-full"
            />
          </div> */}
          {/* Operating System  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Operating System</span>
            </label>
            <input
              type="text"
              {...register("os")}
              name="os"
              defaultValue={operatingSystem}
              className="input input-bordered w-full"
            />
          </div> */}
          {/* Connectivity  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Connectivity</span>
            </label>
            <input
              type="text"
              {...register("connectivity")}
              name="connectivity"
              defaultValue={connectivity}
              className="input input-bordered w-full"
            />
          </div> */}
          {/* Power Source  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Power Source</span>
            </label>
            <input
              type="text"
              {...register("power")}
              name="power"
              defaultValue={powerSource}
              className="input input-bordered w-full"
            />
          </div> */}
          {/* Camera Resolution  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Camera Resolution</span>
            </label>
            <input
              type="number"
              {...register("camera")}
              name="camera"
              defaultValue={cameraResolution}
              className="input input-bordered w-full"
              onFocus={(e) => handlePreventWheel(e)}
            />
          </div> */}
          {/* Storage Capacity  */}
          {/* <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Storage Capacity</span>
            </label>
            <input
              type="number"
              {...register("storage")}
              name="storage"
              defaultValue={storageCapacity}
              className="input input-bordered w-full"
              onFocus={(e) => handlePreventWheel(e)}
            />
          </div>*/}
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
            "Update Gadget"
          )}
        </button>
      </EBForm>
      <DuplicateGadgetModal gadget={data?.data || {}} />
    </div>
  );
};

export default UpdateGadget;
