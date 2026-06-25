import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm, { RegisterHeadContent } from "../Components/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { reg_Slice, userReset } from "../feature/UserSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("cashier");
  const [agreed, setAgreed] = useState(false);
  const [control, setControl] = useState({
    email: "",
    password: "",
    f_name: "",
    l_name: "",
    role: "",
  });

  const { email, password, f_name, l_name } = control;
  const roles = ["cashier", "admin"];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, userSuccess, userMessage, userError } = useSelector(
    (state) => state.auth,
  );

  const handleControl = (e) => {
    setControl({
      ...control,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!f_name || !email || !password || !l_name || !selectedRole) {
      toast.error("Enter all fields");
      return;
    }

    // Term and conditions ka check agar lagana chahein

    let userData = {
      email,
      password,
      role: selectedRole,
      f_name,
      l_name,
    };

    console.log("sending the userData", userData);
    dispatch(reg_Slice(userData));
  };

  // ==== DONO USEEFFECTS KO EK MEIN MEIN MERGE KIYA HAI ====
  useEffect(() => {
    if (userError) {
      toast.error(userMessage || "Registration failed");
    }

    if (userSuccess) {
      toast.success("Account created successfully! Please verify OTP.");
      // Pura system secure rakhne ke liye direct OTP page par navigate karein
      navigate("/otp");
    }
  }, [userError, userSuccess, userMessage, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full bg-white rounded-xl md:w-[60%] xl:w-[35%] lg:w-[45%] p-3 shadow-lg flex flex-col items-center">
        {/* Header/Logo Section */}
        <RegisterHeadContent />

        {/* Content Section */}
        <div className="w-full p-8 pt-0 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-950 mb-3">
              Create Account
            </h2>
            <p className="text-lg text-gray-600 max-w-sm mx-auto">
              Join our secure platform to manage your access levels efficiently.
            </p>
          </div>

          <RegisterForm
            handleControl={handleControl}
            control={control}
            setControl={setControl}
            agreed={agreed}
            setAgreed={setAgreed}
            setSelectedRole={setSelectedRole}
            selectedRole={selectedRole}
            role={roles}
          />
        </div>

        {/* Footer Actions (Sign In / Register) */}
        <div className="w-full bg-gray-50 p-6 flex justify-between items-center rounded-b-xl border-t border-gray-200 mt-auto">
          <Link to="/login">
            <button className="flex items-center gap-2 text-base font-semibold text-gray-700 hover:text-gray-950 transition duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sign In
            </button>
          </Link>
          <button
            onClick={handleClick}
            className="flex items-center gap-2.5 px-10 py-3.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-150 text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
