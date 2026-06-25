import React from "react";

const RegisterForm = ({
  role,
  control,
  setControl,
  handleControl,
  selectedRole,
  setSelectedRole,
  agreed,
  setAgreed,
}) => {
  return (
    <>
      <div className=" flex flex-col  md:flex-row  w-full  gap-4">
        <div className="flex-1 space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            First Name
          </label>
          <input
            name="f_name"
            value={control.name}
            onChange={handleControl}
            type="text"
            placeholder="First Name "
            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150"
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Last Name
          </label>
          <input
            name="l_name"
            value={control.name}
            onChange={handleControl}
            type="text"
            placeholder="Last Name "
            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150"
          />
        </div>
      </div>
      {/* Email Field */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Email Address
        </label>
        <input
          name="email"
          value={control.email}
          onChange={handleControl}
          type="email"
          placeholder="Enter The Email"
          className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150"
        />
      </div>
      {/* Password Field */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            value={control.password}
            onChange={handleControl}
            type="password"
            placeholder="........"
            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150 pr-12"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 cursor-pointer">
            {/* Eye icon representation */}
            👀
          </span>
        </div>
      </div>
      {/* Select Role (Segmented Control) */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Select Role
        </label>
        <div className="w-full flex bg-gray-100 rounded-lg p-1">
          {role.map((role) => (
            <button
              value={control.role}
              onChange={handleControl}
              name="role"
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`flex-1 text-center py-2.5 rounded-md capitalize text-lg font-medium text-base transition-colors duration-150 
                    ${
                      selectedRole === role
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
      {/* Terms Checkbox */}
      <div className="flex items-start gap-3 pt-2">
        <label
          htmlFor="terms"
          className="text-base text-gray-700 leading-relaxed"
        >
          By clicking Register, you agree to our{" "}
          <a href="#" className="font-semibold text-blue-700 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-semibold text-blue-700 hover:underline">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {/* Divider */}
      <div className="relative flex items-center py-4">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
          OR REGISTER WITH
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      {/* Social Register Buttons (row) */}
      <div className="flex gap-4 pt-1">
        <button className="flex-1 flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150">
          {/* Google G icon representation */}
          <span className="font-mono text-xl text-red-500">G</span>
          <span className="text-lg font-medium text-gray-900">Google</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150">
          {/* Apple icon representation */}
          <span className="text-2xl text-black"></span>
          <span className="text-lg font-medium text-gray-900">Apple</span>
        </button>
      </div>
    </>
  );
};

export default RegisterForm;

export const RegisterHeadContent = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center p-6 border-b border-gray-100 relative mb-8">
        <div className="flex items-center gap-2">
          {/* Simple Shield Icon representation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-blue-600"
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
        {/* Blue decorative line */}
        <div className="absolute bottom-0 left-1/4 right-1/4 h-1.5 bg-blue-600 rounded-full"></div>
      </div>
    </>
  );
};
