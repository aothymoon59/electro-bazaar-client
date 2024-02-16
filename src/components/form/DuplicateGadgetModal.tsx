/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ImCross, ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { useAddGadgetMutation } from "../../redux/features/gadgets/gadgetsApi";
import moment from "moment";
import { TGadget } from "../../types/gadget.type";

interface DialogElement extends HTMLDialogElement {
  close: () => void;
}

const DuplicateGadgetModal = ({ gadget }: { gadget: TGadget }) => {
  const dialogRef = useRef<DialogElement>(null);
  const { register, handleSubmit } = useForm();
  const [addGadget, { isLoading }] = useAddGadgetMutation();

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
  } = gadget;

  const { cameraResolution, storageCapacity } = features || {};

  const [formattedReleaseDate, setFormattedReleaseDate] = useState("");

  useEffect(() => {
    // Format the release date using Moment.js
    const formattedDate = moment(releaseDate).format("YYYY-MM-DD");
    setFormattedReleaseDate(formattedDate);
  }, [releaseDate]);

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

      await addGadget(gadget).unwrap();
      // Close the dialog
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      toast.success("Create variant successfully");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handlePreventWheel = (e: any) => {
    e.target.addEventListener(
      "wheel",
      function (e: any) {
        e.preventDefault();
      },
      { passive: false }
    );
  };

  return (
    <dialog
      id="duplicateGadgetModal"
      className="modal modal-bottom sm:modal-middle"
      ref={dialogRef}
    >
      <div className="modal-box relative w-11/12 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* name  */}
            <div className="form-control mb-4">
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
            </div>
            {/* Price  */}
            <div className="form-control mb-4">
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
            </div>
            {/* quantity  */}
            <div className="form-control mb-4">
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
            </div>
            {/* release date  */}
            <div className="form-control mb-4">
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
            </div>
            {/* Brand  */}
            <div className="form-control mb-4">
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
            </div>
            {/* Model Number  */}
            <div className="form-control mb-4">
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
            </div>
            {/* Category  */}
            <div className="form-control mb-4">
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
            </div>
            {/* Operating System  */}
            <div className="form-control mb-4">
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
            </div>
            {/* Connectivity  */}
            <div className="form-control mb-4">
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
            </div>
            {/* Power Source  */}
            <div className="form-control mb-4">
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
            </div>
            {/* Camera Resolution  */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">
                  Camera Resolution
                </span>
              </label>
              <input
                type="number"
                {...register("camera")}
                name="camera"
                defaultValue={cameraResolution}
                className="input input-bordered w-full"
                onFocus={(e) => handlePreventWheel(e)}
              />
            </div>
            {/* Storage Capacity  */}
            <div className="form-control mb-4">
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
            </div>
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
              "Create Variant"
            )}
          </button>
        </form>
        <div className="modal-action justify-center mt-0">
          <form method="dialog">
            <button className="px-2 border-0 bg-transparent text-sm absolute right-3 top-4">
              <ImCross />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DuplicateGadgetModal;
