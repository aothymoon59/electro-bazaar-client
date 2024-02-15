/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useAddSaleMutation } from "../../redux/features/sales/salesApi";
import toast from "react-hot-toast";

type TGadgetProps = {
  gadgetId: string;
  refetch: any;
  limit: number;
};

interface DialogElement extends HTMLDialogElement {
  close: () => void;
}

const SalesManagementModal = ({ gadgetId, refetch, limit }: TGadgetProps) => {
  const dialogRef = useRef<DialogElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addSale] = useAddSaleMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const saleInfo = {
        productId: gadgetId,
        quantity: parseInt(data.quantity),
        buyerName: data.buyerName,
        buyDate: data.buyDate,
      };
      const res = await addSale(saleInfo).unwrap();
      refetch();
      reset();
      // Close the dialog
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      toast.success(res.message);
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
      id="salesManagementModal"
      className="modal modal-bottom sm:modal-middle"
      ref={dialogRef}
    >
      <div className="modal-box relative">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="modal-content commonScrollableModal">
            {/* quantity  */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium">Quantity*</span>
              </label>
              <input
                type="number"
                {...register("quantity", { required: true })}
                name="quantity"
                placeholder={`available quantity ${limit}`}
                className="input input-bordered w-full"
                min={1}
                max={limit}
                onFocus={(e) => handlePreventWheel(e)}
              />
              {errors.quantity && (
                <span className="text-red-600 mt-2 text-xs">
                  Quantity is required
                </span>
              )}
            </div>
            {/* name  */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium">Name*</span>
              </label>
              <input
                type="text"
                {...register("buyerName", { required: true })}
                name="buyerName"
                placeholder="Enter your name here"
                className="input input-bordered w-full"
              />
              {errors.buyerName && (
                <span className="text-red-600 mt-2 text-xs">
                  Buyer Name is required
                </span>
              )}
            </div>
            {/* Buy date  */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium">Buy Date*</span>
              </label>
              <input
                type="date"
                {...register("buyDate", { required: true })}
                name="buyDate"
                placeholder="Enter Buy Date here"
                className="input input-bordered w-full"
              />
              {errors.buyDate && (
                <span className="text-red-600 mt-2 text-xs">
                  Buy Date is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="primary-main-btn w-full hover:bg-opacity-80 transition-all duration-200 ease-in-out"
            >
              Sell Now
            </button>
          </div>
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

export default SalesManagementModal;
