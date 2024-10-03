import EbButton from "../ui/EbButton";
import moment from "moment";

type TGadgetProps = {
  productImage: string;
  name: string;
  price: number;
  releaseDate: string;
  brand: string;
  modelNumber: string;
  category: string;
  quantity: number;
};

const ProductCard = ({ gadget }: { gadget: TGadgetProps }) => {
  const {
    productImage,
    name,
    price,
    releaseDate,
    brand,
    modelNumber,
    category,
    quantity,
  } = gadget;
  return (
    <div className="card card-compact bg-primary-lighter shadow-md">
      <div className="p-3">
        <div className="bg-white w-full h-[200px] p-3 flex justify-center rounded-md">
          <img
            src={productImage}
            alt={name}
            className="rounded-xl h-[170px] max-w-full"
          />
        </div>
        <div className="mt-4">
          <h2 className="card-title">{name}</h2>
          <p className="flex gap-2">
            <span className="font-bold">Price:</span>${price}
          </p>
          <p className="flex gap-2">
            <span className="font-bold">Quantity:</span>
            {quantity}
          </p>
          <p className="flex gap-2">
            <span className="font-bold">Release Date:</span>

            <span>{moment(releaseDate).format("DD/MM/YYYY")}</span>
          </p>
          <p className="flex gap-2">
            <span className="font-bold">Brand:</span>
            {brand}
          </p>
          <p className="flex gap-2">
            <span className="font-bold">Model:</span>
            {modelNumber}
          </p>
          <p className="flex gap-2">
            <span className="font-bold">Category:</span>
            {category}
          </p>
          <div className="card-actions justify-end mt-3">
            <EbButton className="primary-main-btn w-full">Add to Cart</EbButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
