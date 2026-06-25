import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserLogOut } from "../feature/UserSlice";

export const LogOut = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateUser = () => {
    if (user?.role === "admin") {
      navigate("/dashbord");
    } else {
      navigate("/");
    }
  };

  const handleLogOut = () => {
    dispatch(UserLogOut()); // Redux clear
    localStorage.removeItem("user"); // safety extra
    navigate("/"); // redirect login/home
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-2xl">
      {/* Profile Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
        <div className="text-left">
          <h4 className="text-sm font-bold text-white leading-tight">
            {user?.f_name || "User"}
          </h4>
          <span className="text-[10px] font-extrabold text-orange-500 tracking-wider block mt-0.5">
            {user?.role || "MEMBER"}
          </span>
        </div>

        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
          {user?.f_name?.charAt(0) || "U"}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-1">
        <button
          onClick={navigateUser}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg ${user?.role !== "admin" ? "hidden" : "block"}`}
        >
          <span>My Profile</span>
          <span>→</span>
        </button>

        <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg">
          <span>Account Settings</span>
          <span>→</span>
        </button>

        <div className="h-px bg-slate-800 my-2" />

        {/* LOGOUT BUTTON (FIXED) */}
        <button
          onClick={handleLogOut}
          className="w-full flex items-center justify-between px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg font-medium"
        >
          <span>Logout</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
