import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Eye, EyeOff, Loader2 } from "lucide-react";

import { logout } from "../authSlice";
import { deleteAccount, logout as logoutApi } from "../api/auth";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const username = watch("username");
  const password = watch("password");

  const onSubmit = () => {
    setGeneralError("");
    setShowConfirmation(true);
  };

  const handleDeleteAccount = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setGeneralError("");

    const data = {
      username,
      password,
    };

    try {
      console.log("in");
      const response = await deleteAccount(data);

      dispatch(logout());

      setShowConfirmation(false);

      navigate("/login", { replace: true });
    } catch (error) {
      const status = error?.response?.status;
      const errorMsg = error?.response?.data?.detail;

      if (errorMsg) {
        setGeneralError(errorMsg);
      } else if (status === 400 || status === 401 || status === 403) {
        setGeneralError("Invalid username or password.");
      } else {
        setGeneralError("Unable to delete your account. Please try again.");
      }

      setShowConfirmation(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const isFormValid = username?.trim() && password;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Delete Account
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Before deleting your account, please confirm your identity.
          </p>
        </div>

        {/* General Error */}
        {generalError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              autoComplete="username"
              {...register("username", {
                required: "Username is required.",
              })}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                errors.username
                  ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-gray-500 focus:ring-gray-100"
              }`}
            />

            {errors.username && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required.",
                })}
                className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none transition focus:ring-2 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-gray-500 focus:ring-gray-100"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Delete Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className="
              rounded-full
              bg-[#FE322A]
              px-5
              py-3
              text-sm
              font-medium
             text-white
              transition-all
              duration-300
              hover:bg-[#ff4540]
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:bg-[#FE322A]"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            {/* Modal Content */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={20} />
              </div>

              <div>
                <h2
                  id="delete-account-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Delete account?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Are you sure you want to permanently delete your account? This
                  action cannot be undone.
                </p>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                disabled={isDeleting}
                className="
      rounded-full
      border border-gray-300
      px-5 py-3
      text-sm font-medium
      text-gray-700
      transition-all duration-300
      hover:bg-gray-50
      active:scale-95
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="
      inline-flex
      items-center
      justify-center
      gap-2
      rounded-full
      bg-[#FE322A]
      px-5 py-3
      text-sm font-medium
      text-white
      transition-all duration-300
      hover:bg-[#ff4540]
      active:scale-95
      disabled:cursor-not-allowed
      disabled:opacity-50
      disabled:hover:bg-[#FE322A]
    "
              >
                {isDeleting && <Loader2 size={17} className="animate-spin" />}

                {isDeleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
