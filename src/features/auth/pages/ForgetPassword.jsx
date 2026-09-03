import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordRecovery } from "../api/auth";

function ForgotPassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
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

        if (!formData.username.trim() || !formData.email.trim()) {
            setError("Please enter both username and email.");
            return;
        }

        setLoading(true);

        try {
            console.log(formData)
            const response = await requestPasswordRecovery(formData);

            setMessage(response.data.message);
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
                    Forgot Password?
                </h1>

                <p className="mt-3 text-center text-gray-500">
                    Enter your username and email to receive a password
                    reset link.
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

                {!message && (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                )}

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="mt-6 w-full text-sm text-gray-500 hover:text-pink-500"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;