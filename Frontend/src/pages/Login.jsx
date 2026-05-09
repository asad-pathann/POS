import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login_Slice } from "../feature/UserSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [control, setControl] = useState({
    password: "",
    email: "",
  });

  // desture the data

  const { password, email } = control;

  const handleControll = (e) => {
    setControl({
      ...control,
      [e.target.name]: e.target.value,
    });
  };
  //
  // get the user state redux
  const { user, userLoading, userSuccess, userMessage, userError } =
    useSelector((state) => state.auth);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    let userData = {
      password,
      email,
    };
    dispatch(login_Slice(userData));
  };

  useEffect(() => {
    if (userSuccess) {
      toast.success("userLogin ");
      navigate("/");
    }
    if (userError) {
      toast.error(userMessage);
    }
  }, [userError, userSuccess, userMessage]);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="sm:w-[80%]  md:w-[70%] lg:w-[40%] xl:w-[35%] bg-white rounded-3xl shadow-lg flex flex-col items-center p-8 space-y-8 relative overflow-hidden">
        {/* Background decorative light-blue triangle/slopes - representational */}

        <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 -z-10 flex">
          <div className="w-1/2 h-full bg-blue-50/50 skew-y-6"></div>
          <div className="w-1/2 h-full bg-blue-100/30 skew-y-12"></div>
        </div>
        {/* Logo/Header Section */}
        <div className="w-full flex items-center justify-center gap-2 mb-4">
          {/* Shield Icon representation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
            SecureAccess
          </h1>
        </div>
        {/* Content Section */}
        <div className="text-center w-full space-y-2">
          <h2 className="text-3xl font-bold text-gray-950">Welcome Back</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sign in to continue to your secure workspace.
          </p>
        </div>
        {/* Form Fields */}
        <div className="w-full space-y-6">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Email Address
            </label>
            <input
              name="email"
              value={email}
              onChange={handleControll}
              type="email"
              placeholder="Enter The Email"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150"
            />
          </div>

          {/* Password Field with Forgot Password link */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Password
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <input
              name="password"
              value={password}
              onChange={handleControll}
              type="password"
              placeholder="........"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150 pr-12"
            />
          </div>
        </div>
        {/* Sign In Button */}
        <button
          onClick={handleLogin}
          className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-150 text-base shadow-md"
        >
          Sign In
        </button>
        {/* End-to-end encrypted session indicator */}
        <div className="w-full flex justify-center pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium border border-gray-200">
            {/* Shield icon placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 9a1 1 0 112 0v1a1 1 0 11-2 0v-1zm1-8a1 1 0 011 1v4a1 1 0 11-2 0V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            End-to-end encrypted session
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="w-full max-w-lg mt-8 flex border border-gray-200 rounded-full bg-gray-50 overflow-hidden shadow-inner">
        <button className="flex-1 flex   items-center justify-center gap-1.5 py-4 bg-blue-600 text-white rounded-full">
          {/* Sign in icon placeholder */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-semibold">Sign In</span>
        </button>

        <Link
          className="flex-1 flex  items-center justify-center"
          to={"/register"}
        >
          <button className=" flex gap-1.5 py-4  text-gray-700 hover:text-gray-950 transition duration-150">
            {/* Register icon placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            <span className="text-sm font-semibold">Register</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
