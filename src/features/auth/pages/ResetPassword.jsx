import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/auth";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
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

        if (!formData.password || !formData.confirmPassword) {
            setError("Please fill in both password fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await resetPassword(
                token,
                {
                    password: formData.password
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            const backendMessage = error?.response?.data?.message;

            if (Array.isArray(backendMessage)) {
                setError(backendMessage.join(" "));
            } else {
                setError(
                    backendMessage ||
                    "Unable to reset your password."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">

                <h1 className="text-2xl font-bold text-gray-900 text-center">
                    Reset Password
                </h1>

                <p className="mt-3 text-center text-gray-500">
                    Enter your new password below.
                </p>

                {error && (
                    <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {message ? (
                    <div className="mt-5 text-center">
                        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                            {message}
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Redirecting to login...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                New Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Confirm Password
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
                )}
            </div>
        </div>
    );
}

export default ResetPassword;