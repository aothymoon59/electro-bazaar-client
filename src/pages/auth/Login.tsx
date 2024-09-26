/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "moon@seopage1.net",
      password: "12345678",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      reset();
      toast.success(res.message);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="lg:p-3 min-h-screen flex justify-center items-center bg-purple-100 lg:bg-transparent">
      <div className="bg-purple-100 p-5 rounded-md sm:shadow-md w-full max-w-[400px]">
        <div className="text-center mb-5">
          <h2 className="text-xl font-normal mb-2">
            Welcome To{" "}
            <span className="font-bold text-primary-main">ElectroMart</span>
          </h2>
          <p className="text-sm">Please enter your credentials to login</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Email*</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="example@gmail.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-red-600 mt-2 text-xs">
                Email is required
              </span>
            )}
          </div>
          <div className="form-control mb-6 relative">
            <label className="label">
              <span className="label-text font-medium">Password*</span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: true,
              })}
              name="password"
              placeholder="******"
              className="input input-bordered w-full"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600 mt-2 text-xs">Password is required</p>
            )}
            <p
              className="absolute top-[48px] right-[15px]"
              onClick={() => setShowPass(!showPass)}
            >
              <small>{showPass ? <FaEye /> : <FaEyeSlash />}</small>
            </p>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
