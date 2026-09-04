import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

import ProfileMenu from "./ProfileMenu";

function Header() {

    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const handleNavigation = (slug) => {
        navigate(slug);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="relative z-30 w-full bg-white dark:bg-gray-800">
            <div className="container flex items-center justify-between h-24 sm:h-32 px-6 mx-auto">

                {/* Logo */}
                <div className="text-2xl sm:text-3xl font-black text-gray-800 uppercase dark:text-white">
                    <Link to="/">
                        Interview Platform
                    </Link>
                </div>

                {/* Desktop Navigation */}
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

                        {/* Profile */}
                        {authStatus && (
                            <div className="flex px-6 py-2">
                                <ProfileMenu userData={userData} />
                            </div>
                        )}

                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsMobileMenuOpen((prev) => !prev)
                        }
                        className="flex items-center justify-center p-2 ml-4 text-gray-800 rounded-lg hover:bg-gray-100 lg:hidden dark:text-white dark:hover:bg-gray-700"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>

                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="border-t border-gray-200 bg-white lg:hidden dark:border-gray-700 dark:bg-gray-800">

                    <nav className="container px-6 py-4 mx-auto">

                        {navItems.map((item) =>
                            item.active ? (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => handleNavigation(item.slug)}
                                    className="block w-full px-4 py-3 text-left text-base font-medium text-gray-800 uppercase rounded-lg hover:bg-gray-100 hover:text-pink-500 dark:text-white dark:hover:bg-gray-700"
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}

                        {/* Mobile Profile */}
                        {authStatus && (
                            <div className="px-4 py-3">
                                <ProfileMenu userData={userData} mobile />
                            </div>
                        )}

                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;

