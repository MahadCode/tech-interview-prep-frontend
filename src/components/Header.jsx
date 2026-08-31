import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Questions",
            slug: "/all-questions",
            active: authStatus,
        },
        {
            name: "Add Question",
            slug: "/add-question",
            active: authStatus,
        },
    ];

    return (
        <header className="z-30 flex items-center w-full h-24 sm:h-32 bg-white dark:bg-gray-800">
            <div className="container flex items-center justify-between px-6 mx-auto">

                {/* Logo */}
                <div className="text-3xl font-black text-gray-800 uppercase dark:text-white">
                    <Link to="/">
                        Interview Platform
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex items-center">

                    <nav className="items-center hidden text-lg text-gray-800 uppercase lg:flex dark:text-white">

                        {navItems.map((item) =>
                            item.active ? (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => navigate(item.slug)}
                                    className="flex px-6 py-2 hover:text-pink-500 duration-200"
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}

                        {/* Logout */}
                        {authStatus && (
                            <div className="flex px-6 py-2">
                                <LogoutBtn />
                            </div>
                        )}

                    </nav>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="flex flex-col ml-4 lg:hidden"
                    >
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white" />
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white" />
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white" />
                    </button>

                </div>
            </div>
        </header>
    );
}

export default Header;
