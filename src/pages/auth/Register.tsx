/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
import { FieldValues, useForm } from "react-hook-form";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await registerUser(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user, token: res.data.accessToken }));
      reset();
      toast.success(res.message);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="lg:p-3 min-h-screen flex justify-center items-center bg-primary-light lg:bg-transparent">
      <div className="bg-primary-lighter p-5 rounded-md sm:shadow-md w-full max-w-[400px]">
        <div className="text-center mb-5">
          <h2 className="text-xl font-normal mb-2">
            Welcome To{" "}
            <span className="font-bold text-primary-main">ElectroBazaar</span>
          </h2>
          <p className="text-sm">Please enter your details for register</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Name*</span>
            </label>
            <input
              type="name"
              {...register("name", { required: true })}
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-600 mt-2 text-xs">
                Name is required
              </span>
            )}
          </div>
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
              "register"
            )}
          </button>
          <p className="text-center mt-4 mb-6">
            <small>
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary-main">
                Login
              </Link>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
