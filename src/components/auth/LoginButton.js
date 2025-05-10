import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/API";
import {isLoggedIn, save} from "../../service/storage/cookies.js";;

const LoginButton = ({ username, password }) => {
const navigate = useNavigate();

if (isLoggedIn()) navigate("/dashboard"); // Redirect to dashboard if already logged in

const handleLogin = async (e) => {
    e.preventDefault(); // prevent native form submit
    try {
        const res = await API.post("/users/login", { username, password });
        save.token(res.data.token);
        save.username(res.data.username);
        save.role(res.data.role);
        navigate("/dashboard");
    } catch (err) {
        alert("Login failed!");
    }
};

  return (
    <button onClick={handleLogin} className="btn btn-primary w-100">
      Login
    </button>
  );
};

export default LoginButton;
