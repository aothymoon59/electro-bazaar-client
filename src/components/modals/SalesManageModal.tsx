/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import EbButton from "../ui/EbButton";
import EBForm from "../ui/EBForm";
import EBInput from "../ui/EBInput";
import EBModal from "../ui/EBModal";
import { FieldValues } from "react-hook-form";
import { useAddSaleMutation } from "../../redux/features/sales/salesApi";
import { useState } from "react";

type SalesManageModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gadgetId: string;
  limit: number;
};

const SalesManageModal = ({
  isModalOpen,
  setIsModalOpen,
  gadgetId,
  limit,
}: SalesManageModalProps) => {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [addSale, { isLoading: addSaleIsLoading }] = useAddSaleMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const saleInfo = {
        productId: gadgetId,
        quantity: parseInt(data.quantity),
        buyerName: data.buyerName,
        buyDate: data.buyDate,
      };
      const res = await addSale(saleInfo).unwrap();
      setIsModalOpen(false);
      setIsSubmitSuccess(true);
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <EBModal
      title="Create a sale"
      isCentered
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalWidth={545}
    >
      <EBForm onSubmit={onSubmit} isSubmitSuccess={isSubmitSuccess}>
        <EBInput
          type="number"
          name="quantity"
          label="Quantity"
          required
          placeholder={`available quantity ${limit}`}
          isUpdating={addSaleIsLoading}
          min={1}
          max={limit}
        />
        <EBInput
          type="text"
          name="buyerName"
          label="Name"
          required
          placeholder="Name of the buyer"
          isUpdating={addSaleIsLoading}
        />
        <EBInput
          type="date"
          name="buyDate"
          label="Sell Date"
          required
          placeholder="Date of the sale"
        />
        <EbButton
          isLoading={addSaleIsLoading}
          type="submit"
          className="custom-class w-full"
        >
          Sell Now
        </EbButton>
      </EBForm>
    </EBModal>
  );
};

export default SalesManageModal;
