import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const token = localStorage.getItem("token");

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>; // Replace with a better spinner if desired
    }

    if (!user || !token) {
        return <Navigate state={{ from: location.pathname }} to="/sign-in" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Redirect users who don't have the correct role
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PrivateRoute;
