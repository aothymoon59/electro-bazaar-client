import { Link } from "react-router-dom";
import { Result } from "antd";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link
            to="/"
            className="primary-main-btn no-underline hover:bg-opacity-80 transition-all duration-200 ease-in-out"
          >
            Back to home
          </Link>
        }
      />
    </div>
  );
};

export default ErrorPage;
