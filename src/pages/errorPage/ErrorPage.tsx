import { Link } from "react-router-dom";

import errorImage from "../../assets/icons/warning.png";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <img
          className="w-[150px] sm:w-[250px] md:w-[350px] mx-auto"
          src={errorImage}
          alt="Error Image"
        />
        <p className="lg:text-2xl text-primary-main text-center">
          404 Not Found
        </p>
        <div className="text-center mt-6">
          <Link
            to="/"
            className="primary-main-btn no-underline hover:bg-opacity-80 transition-all duration-200 ease-in-out"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
