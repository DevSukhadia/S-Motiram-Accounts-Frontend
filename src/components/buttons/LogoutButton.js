import React from "react";
import { useNavigate } from "react-router-dom";
import { remove } from "../../service/storage/cookies.js";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    remove.token();
    remove.username();
    remove.role();
    navigate("/");
  };

  return (
    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
