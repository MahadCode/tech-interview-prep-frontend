import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRound, ChevronDown, Lock } from "lucide-react";

import { logout as logoutAction } from "../features/auth/authSlice.js";
import { logout as logoutApi } from "../features/auth/api/auth.js";

function ProfileMenu({ userData, mobile = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isVerified = userData?.account_status === "active";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logoutAction());
      navigate("/login");
      setIsOpen(false);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const handleNavigate = (path, options) => {
    setIsOpen(false);
    navigate(path, options);
  };

  const username = userData?.first_name || userData?.username || "User";

  return (
    <div ref={menuRef} className={mobile ? "w-full" : "relative"}>
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={
          mobile
            ? "flex w-full items-center gap-3 px-4 py-3 text-left text-base font-medium text-gray-800 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            : "flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
        }
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-200 text-gray-600 shrink-0">
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              alt={username}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserRound size={22} strokeWidth={2} />
          )}
        </div>

        {mobile && (
          <>
            <span>Profile</span>
            <ChevronDown
              size={18}
              className={`ml-auto transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {/* Desktop Dropdown */}
      {isOpen && !mobile && (
        <div className="absolute right-0 mt-3 w-56 rounded-xl border border-gray-200 bg-white shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{username}</p>

            {userData?.email && (
              <p className="mt-1 truncate text-xs text-gray-500">
                {userData.email}
              </p>
            )}

            {userData?.account_status === "pending_verification" && (
              <>
                <span className="mt-2 inline-flex items-center gap-x-1.5 rounded-md bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                  <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                  Email Not Verified
                </span>

                <button
                  onClick={() =>
                    navigate("/verification-email-sent", {
                      state: { from: "verify-email" },
                    })
                  }
                  className="mt-2 inline-flex items-center rounded-md bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                >
                  Verify Email
                </button>
              </>
            )}

            {userData?.account_status === "active" && (
              <span className="mt-2 inline-flex items-center gap-x-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Email Verified
              </span>
            )}
          </div>

          <div className="py-2">
            {/* Manage Reports */}
            {userData?.role == "moderator" && (
              <button
                type="button"
                onClick={() => handleNavigate("/moderation")}
                className={`flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                  isVerified ? "text-gray-700" : "text-gray-500"
                }`}
              >
                <span>Manage Reports</span>

                {!isVerified && (
                  <Lock size={14} className="ml-auto text-gray-400" />
                )}
              </button>
            )}

            {/* Manage Profile */}
            <button
              type="button"
              onClick={() => handleNavigate("/profile")}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Manage Profile
            </button>

            {/* Dashboard */}
            <button
              type="button"
              onClick={() => handleNavigate("/dashboard")}
              className={`flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                isVerified ? "text-gray-700" : "text-gray-500"
              }`}
            >
              <span>Dashboard</span>

              {!isVerified && (
                <Lock size={14} className="ml-auto text-gray-400" />
              )}
            </button>

            {/* Manage Goals */}
            <button
              type="button"
              onClick={() => handleNavigate("/dashboard/goals")}
              className={`flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                isVerified ? "text-gray-700" : "text-gray-500"
              }`}
            >
              <span>Manage Goals</span>

              {!isVerified && (
                <Lock size={14} className="ml-auto text-gray-400" />
              )}
            </button>

            {/* See Progress */}
            <button
              type="button"
              onClick={() => handleNavigate("/dashboard/progress")}
              className={`flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                isVerified ? "text-gray-700" : "text-gray-500"
              }`}
            >
              <span>See Progress</span>

              {!isVerified && (
                <Lock size={14} className="ml-auto text-gray-400" />
              )}
            </button>

            {/* See Stats */}
            <button
              type="button"
              onClick={() => handleNavigate("/dashboard/statistics")}
              className={`flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                isVerified ? "text-gray-700" : "text-gray-500"
              }`}
            >
              <span>See Stats</span>

              {!isVerified && (
                <Lock size={14} className="ml-auto text-gray-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("/taxonomy")}
              className={`flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                isVerified ? "text-gray-700" : "text-gray-500"
              }`}
            >
              <span>Manage Taxonomy</span>

              {!isVerified && (
                <Lock size={14} className="ml-auto text-gray-400" />
              )}
            </button>


            {/* Change Password */}
            <button
              type="button"
              onClick={() => handleNavigate("/change-password")}
              className={`flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                isVerified ? "text-gray-700" : "text-gray-500"
              }`}
            >
              <span>Change Password</span>

              {!isVerified && (
                <Lock size={14} className="ml-auto text-gray-400" />
              )}
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Mobile Profile Options */}
      {isOpen && mobile && (
        <div className="mt-1 ml-4 border-l-2 border-gray-200 dark:border-gray-600">
          {userData?.email && (
            <p className="px-5 pt-2 pb-1 text-xs text-gray-500 dark:text-gray-400 truncate">
              {userData.email}
            </p>
          )}

          {/* Email Not Verified */}
          {userData?.account_status === "pending_verification" && (
            <div className="px-5 py-2">
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-500/20">
                <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                Email Not Verified
              </span>

              <button
                type="button"
                onClick={() =>
                  handleNavigate("/verification-email-sent", {
                    state: { from: "verify-email" },
                  })
                }
                className="mt-2 inline-flex items-center rounded-md bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Verify Email
              </button>
            </div>
          )}

          {/* Email Verified */}
          {userData?.account_status === "active" && (
            <div className="px-5 py-2">
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Email Verified
              </span>
            </div>
          )}

          {/* Manage Reports */}
          {userData?.role == "moderator" && (
            <button
              type="button"
              onClick={() => handleNavigate("/moderation")}
              className={`flex w-full items-center px-5 py-2.5 text-left text-sm hover:text-pink-500 ${
                isVerified
                  ? "text-gray-700 dark:text-gray-200"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span>Manage Reports</span>

              {!isVerified && (
                <Lock
                  size={14}
                  className="ml-auto text-gray-400 dark:text-gray-500"
                />
              )}
            </button>
          )}

          {/* Manage Profile */}
          <button
            type="button"
            onClick={() => handleNavigate("/profile")}
            className="block w-full px-5 py-2.5 text-left text-sm text-gray-700 hover:text-pink-500 dark:text-gray-200"
          >
            Manage Profile
          </button>

          {/* Dashboard */}
          <button
            type="button"
            onClick={() => handleNavigate("/dashboard")}
            className={`flex w-full items-center px-5 py-2.5 text-left text-sm hover:text-pink-500 ${
              isVerified
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span>Dashboard</span>

            {!isVerified && (
              <Lock
                size={14}
                className="ml-auto text-gray-400 dark:text-gray-500"
              />
            )}
          </button>

          {/* Manage Goals */}
          <button
            type="button"
            onClick={() => handleNavigate("/dashboard/goals")}
            className={`flex w-full items-center px-5 py-2.5 text-left text-sm hover:text-pink-500 ${
              isVerified
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span>Manage Goals</span>

            {!isVerified && (
              <Lock
                size={14}
                className="ml-auto text-gray-400 dark:text-gray-500"
              />
            )}
          </button>

          {/* See Progress */}
          <button
            type="button"
            onClick={() => handleNavigate("/dashboard/progress")}
            className={`flex w-full items-center px-5 py-2.5 text-left text-sm hover:text-pink-500 ${
              isVerified
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span>See Progress</span>

            {!isVerified && (
              <Lock
                size={14}
                className="ml-auto text-gray-400 dark:text-gray-500"
              />
            )}
          </button>

          {/* See Stats */}
          <button
            type="button"
            onClick={() => handleNavigate("/dashboard/statistics")}
            className={`flex w-full items-center px-5 py-2.5 text-left text-sm hover:text-pink-500 ${
              isVerified
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span>See Stats</span>

            {!isVerified && (
              <Lock
                size={14}
                className="ml-auto text-gray-400 dark:text-gray-500"
              />
            )}
          </button>

          {/* Manage Taxonomy */}
          <button
            type="button"
            onClick={() => handleNavigate("/taxonomy")}
            className={`flex w-full items-center px-5 py-2.5 text-left text-sm hover:text-pink-500 ${
              isVerified
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span>Manage Taxonomy</span>

            {!isVerified && (
              <Lock
                size={14}
                className="ml-auto text-gray-400 dark:text-gray-500"
              />
            )}
          </button>

          {/* Change Password */}
          <button
            type="button"
            onClick={() => handleNavigate("/change-password")}
            className={`flex w-full items-center px-5 py-2.5 text-left text-sm hover:text-pink-500 ${
              isVerified
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span>Change Password</span>

            {!isVerified && (
              <Lock
                size={14}
                className="ml-auto text-gray-400 dark:text-gray-500"
              />
            )}
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full px-5 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
