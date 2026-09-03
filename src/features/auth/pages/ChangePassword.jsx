import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/auth";

function ChangePassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (formData.currentPassword === formData.newPassword) {
            setError("New password must be different from your current password.");
            return;
        }

        setLoading(true);

        try {
            const response = await changePassword({
                current_password: formData.currentPassword,
                new_password: formData.newPassword,
            });

            setMessage(response.data.message);

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">

                <h1 className="text-2xl font-bold text-gray-900 text-center">
                    Change Password
                </h1>

                <p className="mt-3 text-center text-gray-500">
                    Update your password to keep your account secure.
                </p>

                {error && (
                    <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                    {/* Current Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Current Password
                        </label>

                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                            placeholder="Enter current password"
                        />

                        <button
                            type="button"
                            onClick={() => navigate("/forgot-password")}
                            className="mt-2 text-sm text-pink-500 hover:text-pink-600"
                        >
                            Forgot your password?
                        </button>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            New Password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                            placeholder="Enter new password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                            placeholder="Retype new password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Changing Password..." : "Change Password"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default ChangePassword;