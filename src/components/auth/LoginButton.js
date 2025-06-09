import React from "react";

const LoginButton = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="btn btn-primary w-100"
    >
      {disabled ? "Logging in..." : "Login"}
    </button>
  );
};

export default LoginButton;
