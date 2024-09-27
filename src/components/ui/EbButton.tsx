import React from "react";
import { ImSpinner9 } from "react-icons/im"; // Ensure you have react-icons installed

type ButtonProps = {
  isLoading?: boolean; // Controls loading state
  disabled?: boolean; // Disabled state
  onClick?: () => void; // Click handler
  className?: string; // Custom classNames
  type?: "button" | "submit" | "reset"; // Type of button
  children?: React.ReactNode; // Button content (text or JSX)
};

const EbButton: React.FC<ButtonProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  children,
}) => {
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
