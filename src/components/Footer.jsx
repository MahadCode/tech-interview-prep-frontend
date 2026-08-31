import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-white border-t-2 border-gray-800 dark:bg-gray-800 dark:border-white">
            <div className="container px-6 py-12 mx-auto">

                <div className="flex flex-col gap-10 md:flex-row md:justify-between">

                    {/* Brand */}
                    <div className="md:w-1/3">
                        <Link to="/">
                            <h2 className="text-3xl font-black text-gray-800 uppercase dark:text-white">
                                Interview
                                <span className="text-pink-500">.</span>
                            </h2>
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-300">
                            Prepare for technical interviews, practice real
                            interview questions, share solutions, and track
                            your preparation progress.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-white">
                            Platform
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/all-posts"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    All Questions
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/add-post"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    Add Question
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-white">
                            Account
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/login"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/signup"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    Sign Up
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-white">
                            About
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-gray-600 hover:text-pink-500 dark:text-gray-300 duration-200"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="flex flex-col gap-3 pt-8 mt-10 border-t border-gray-300 sm:flex-row sm:items-center sm:justify-between dark:border-gray-600">

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2026 Interview Platform. All rights reserved.
                    </p>

                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Prepare. Practice. <span className="text-pink-500">Succeed.</span>
                    </p>

                </div>

            </div>
        </footer>
    );
}

export default Footer;
