import React from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../features/auth/authSlice.js";
import { logout as logoutApi } from "../features/auth/api/auth.js";

function LogoutBtn() {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {

            await logoutApi();

            dispatch(logoutAction());

        } catch (error) {

            console.log(error.response?.data);

        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;