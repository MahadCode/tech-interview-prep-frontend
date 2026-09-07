import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function IsVerified({ children }) {
    const userData = useSelector((state) => state.auth.userData);
    const location = useLocation();

    if (userData?.account_status !== "active") {
        return (
            <Navigate
                to="/verification-email-sent"
                state={{
                    from: "verify-email",
                    redirectTo: location.pathname,
                }}
                replace
            />
        );
    }

    return children;
}