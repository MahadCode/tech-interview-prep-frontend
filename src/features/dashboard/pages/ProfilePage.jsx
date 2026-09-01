import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../api/dashboardService";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch()
  const getProfile = () => {
    reset(userData);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await updateProfile(data);

      reset(response.data);
      dispatch(updateUserData({...userData,...response.data,}));
      setIsEditing(false);
    } catch (error) {
    
      const e = error?.response?.data;
      
      Object.entries(e || {}).forEach(([field, messages]) => {
        setError(field, {
          type: "server",
          message: messages?.[0],
        });
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your profile information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-lg font-semibold text-white">
                U
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Profile Information
                </h2>
                <p className="text-sm text-gray-500">
                  Your personal information
                </p>
              </div>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2">
              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Username
                </label>

                {isEditing ? (
                  <input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                ) : (
                  <p className="rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-900">
                    {watch("username") || "—"}
                  </p>
                )}

                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* First Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First Name
                </label>

                {isEditing ? (
                  <input
                    {...register("first_name")}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                ) : (
                  <p className="rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-900">
                    {watch("first_name") || "—"}
                  </p>
                )}

                {errors.first_name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name
                </label>

                {isEditing ? (
                  <input
                    {...register("last_name")}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                ) : (
                  <p className="rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-900">
                    {watch("last_name") || "—"}
                  </p>
                )}
                {errors.last_name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>

                {isEditing ? (
                  <input
                    {...register("phone")}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                ) : (
                  <p className="rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-900">
                    {watch("phone") || "—"}
                  </p>
                )}
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Bio
                </label>

                {isEditing ? (
                  <textarea
                    {...register("bio")}
                    rows={5}
                    placeholder="Tell us a little about yourself..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                ) : (
                  <p className="min-h-30 rounded-lg bg-gray-50 px-3 py-2.5 text-sm leading-6 text-gray-900">
                    {watch("bio") || "No bio added yet."}
                  </p>
                )}
                {errors.bio && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.bio.message}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            {isEditing && (
              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
