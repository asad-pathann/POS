// Otp.jsx
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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

  const handleOtp = async () => {
    setError("");
    setLoading(true);

    const enteredOtp = otp.join("");
    const storedOtp = user?.otp; // yahan se user ka OTP mil raha hai (Redux se)

    // Optional: agar real API call karna ho to yahan fetch/axios use karo
    // abhi simple check kar rahe hain

    await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay

    // let myotp = user?.otp;

    if (enteredOtp === storedOtp) {
      // OTP match ho gaya
      navigate("product_card"); // redirect to work page
    } else {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]); // clear inputs
      inputRefs.current[0]?.focus();
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
            We sent a 6-digit code to your email
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOtp(); // form submit par bhi verify karo
          }}
        >
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
                className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isOtpComplete || loading}
            onClick={handleOtp}
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
            <button className="text-blue-600 font-medium hover:underline">
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
