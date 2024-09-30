import { PropsWithChildren } from "react";
import { ImSpinner9 } from "react-icons/im"; // Ensure you have react-icons installed

type ButtonProps = {
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  // children?: React.ReactNode;
};

const EbButton = ({
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={`primary-main-btn hover:bg-opacity-80 transition-all duration-200 ease-in-out ${
        (isLoading || disabled) && "cursor-not-allowed"
      } ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled} // Disable when loading or explicitly disabled
      type={type}
    >
      {isLoading ? <ImSpinner9 className="m-auto animate-spin" /> : children}
    </button>
  );
};

export default EbButton;
