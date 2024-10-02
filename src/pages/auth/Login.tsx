/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import EBInput from "../../components/ui/EBInput";
import EBForm from "../../components/ui/EBForm";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      if (res?.success == true) {
        toast.success(res.message);
        navigate(from, { replace: true });
      }
      return res;
    } catch (error: any) {
      toast.error(error.data.errorMessage || error.data.message);
    }
  };

  return (
    <div className="lg:p-3 min-h-screen flex justify-center items-center bg-primary-lighter lg:bg-transparent">
      <div className="bg-primary-lighter p-5 rounded-md sm:shadow-md w-full max-w-[400px]">
        <div className="text-center mb-5">
          <h2 className="text-xl font-normal mb-2">
            Welcome To{" "}
            <span className="font-bold text-primary-main">ElectroBazaar</span>
          </h2>
          <p className="text-sm">Please enter your credentials to login</p>
        </div>
        <EBForm onSubmit={onSubmit}>
          <EBInput
            type="email"
            name="email"
            label="Email"
            required
            prefix={<MdEmail />}
            placeholder="example@gmail.com"
          />
          <EBInput
            type="password"
            name="password"
            label="Password"
            required
            prefix={<FaLock />}
            placeholder="******"
            suffix={
              <p
                onClick={() => setShowPass(!showPass)}
                className="cursor-pointer"
              >
                <small>{showPass ? <FaEye /> : <FaEyeSlash />}</small>
              </p>
            }
            showPass={showPass}
          />
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
              "Login"
            )}
          </button>
          <p className="text-center mt-4 mb-6">
            <small>
              New user?{" "}
              <Link to="/register" className="font-semibold text-primary-main">
                Register
              </Link>
            </small>
          </p>
        </EBForm>
      </div>
    </div>
  );
};

export default Login;
