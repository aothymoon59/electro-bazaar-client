import { Link } from "react-router-dom";
import { Result } from "antd";
//Error git page
const UnAuthorized = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page.."
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

export default UnAuthorized;
