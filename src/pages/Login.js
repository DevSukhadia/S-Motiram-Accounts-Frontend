import React, { useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../service/storage/cookies.js";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) navigate("/dashboard"); // Redirect to dashboard if already logged in
    }, [navigate]);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ minWidth: "350px" }}>
                <h3 className="text-center mb-4">Login</h3>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
