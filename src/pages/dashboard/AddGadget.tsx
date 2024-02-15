/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useAddGadgetMutation } from "../../redux/features/gadgets/gadgetsApi";

const AddGadget = () => {
  const [addGadget, { isLoading }] = useAddGadgetMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const gadget = {
        name: data.name,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        releaseDate: data.release,
        brand: data.brand,
        modelNumber: data.model,
        category: data.category,
        operatingSystem: data.os,
        connectivity: data.connectivity,
        powerSource: data.power,
        features: {
          cameraResolution: parseFloat(data.camera),
          storageCapacity: parseFloat(data.storage),
        },
      };

      const res = await addGadget(gadget).unwrap();
      reset();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handlePreventWheel = (e: any) => {
    e.target.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h5 className="font-bold text-xl leading-[30px] text-primary-main">
          Add Gadgets
        </h5>
      </div>
      <hr className="border-primary-main my-[23px]" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* name  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              placeholder="Enter product name here"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-600 mt-2 text-xs">
                Name is required
              </span>
            )}
          </div>
          {/* Price  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              name="price"
              placeholder="Enter product price here"
              className="input input-bordered w-full"
              onFocus={(e) => handlePreventWheel(e)}
            />
            {errors.price && (
              <span className="text-red-600 mt-2 text-xs">
                Price is required
              </span>
            )}
          </div>
          {/* quantity  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Quantity*</span>
            </label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              name="quantity"
              placeholder="Enter product quantity here"
              className="input input-bordered w-full"
              onFocus={(e) => handlePreventWheel(e)}
            />
            {errors.quantity && (
              <span className="text-red-600 mt-2 text-xs">
                Quantity is required
              </span>
            )}
          </div>
          {/* release date  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Release Date*</span>
            </label>
            <input
              type="date"
              {...register("release", { required: true })}
              name="release"
              placeholder="Enter Release Date here"
              className="input input-bordered w-full"
            />
            {errors.release && (
              <span className="text-red-600 mt-2 text-xs">
                Release Date is required
              </span>
            )}
          </div>
          {/* Brand  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Brand*</span>
            </label>
            <input
              type="text"
              {...register("brand", { required: true })}
              name="brand"
              placeholder="Enter product brand here"
              className="input input-bordered w-full"
            />
            {errors.brand && (
              <span className="text-red-600 mt-2 text-xs">
                Brand is required
              </span>
            )}
          </div>
          {/* Model Number  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Model Number*</span>
            </label>
            <input
              type="text"
              {...register("model", { required: true })}
              name="model"
              placeholder="Enter product model here"
              className="input input-bordered w-full"
            />
            {errors.model && (
              <span className="text-red-600 mt-2 text-xs">
                Model is required
              </span>
            )}
          </div>
          {/* Category  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Category*</span>
            </label>
            <input
              type="text"
              {...register("category", { required: true })}
              name="category"
              placeholder="Enter product category here"
              className="input input-bordered w-full"
            />
            {errors.category && (
              <span className="text-red-600 mt-2 text-xs">
                Category is required
              </span>
            )}
          </div>
          {/* Operating System  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Operating System</span>
            </label>
            <input
              type="text"
              {...register("os", { required: true })}
              name="os"
              placeholder="Enter product Operating System here"
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
              {...register("connectivity", { required: true })}
              name="connectivity"
              placeholder="Enter product connectivity here"
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
              {...register("power", { required: true })}
              name="power"
              placeholder="Enter product Power Source here"
              className="input input-bordered w-full"
            />
          </div>
          {/* Camera Resolution  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Camera Resolution*</span>
            </label>
            <input
              type="number"
              {...register("camera", { required: true })}
              name="camera"
              placeholder="Enter product Camera Resolution here"
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
              {...register("storage", { required: true })}
              name="storage"
              placeholder="Enter product Storage Capacity here"
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
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddGadget;
