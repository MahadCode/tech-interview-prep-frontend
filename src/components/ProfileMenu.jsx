import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRound, ChevronDown } from "lucide-react";

import { logout as logoutAction } from "../features/auth/authSlice.js";
import { logout as logoutApi } from "../features/auth/api/auth.js";

function ProfileMenu({ userData, mobile = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log(error.response?.data);
    }
  };

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
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
          </div>

          <div className="py-2">
            <button
              type="button"
              onClick={() => handleNavigate("/profile")}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Manage Profile
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("/dashboard")}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Dashboard
            </button>
          </div>

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
          <button
            type="button"
            onClick={() => handleNavigate("/profile")}
            className="block w-full px-5 py-2.5 text-left text-sm text-gray-700 hover:text-pink-500 dark:text-gray-200"
          >
            Manage Profile
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/dashboard")}
            className="block w-full px-5 py-2.5 text-left text-sm text-gray-700 hover:text-pink-500 dark:text-gray-200"
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="block w-full px-5 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
