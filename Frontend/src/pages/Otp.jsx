import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // useDispatch add kiya state handle karne ke liye
import { useNavigate } from "react-router-dom";
import { userReset } from "../feature/UserSlice"; // Agar OTP sahi ho jaye toh register state saaf karne ke liye
import toast from "react-hot-toast";

const Otp = () => {
  // Redux se user object nikala jisme backend se aaya JSON data (with OTP) hai
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Auto-focus pehle input par
  useEffect(() => {
    inputRefs.current[0]?.focus();

    // Console check karne ke liye ki backend se JSON mein kya data aaya hai
    console.log("Backend response stored in Redux:", user);
  }, [user]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && /^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  // ==== OTP Redux Match Logic ====
  const handleOtpSubmit = async (e) => {
    if (e) e.preventDefault(); // Form reload roko

    setError("");
    setLoading(true);

    const enteredOtp = otp.join(""); // Jo user ne boxes mein type kiya

    // JSON response ke andar jo backend ne OTP bheja tha (e.g., user.otp)
    const backendOtp = user?.otp;

    // Chota sa fake delay achi UI feel ke liye
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Redux wale OTP aur typed OTP ko aapas mein match kiya
    if (enteredOtp === String(backendOtp)) {
      toast.success("Verification Successful!");

      // Role ke hisab se routing
      if (user?.role === "admin") {
        navigate("/dashbord");
      } else {
        navigate("/product-card");
      }

      // Agle page par jaane ke baad register state reset kar do
    } else {
      // Agar OTP match na ho
      toast.error("Invalid Code!");
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]); // Inputs khali karo
      inputRefs.current[0]?.focus(); // Wapas pehle box par focus
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Verify Your Email
          </h2>
          <p className="text-gray-600 mt-2">
            We sent a 6-digit code to **{user?.email || "your email"}**
          </p>
        </div>

        <form onSubmit={handleOtpSubmit}>
          <div className="flex justify-center gap-4 mb-8" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-2xl font-bold border-2 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isOtpComplete || loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all
              ${
                isOtpComplete && !loading
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-blue-600 font-medium hover:underline"
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
