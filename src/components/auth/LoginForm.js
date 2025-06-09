import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../shared/Form";
import Label from "../shared/Label";
import Input from "../shared/Input";
import LoginButton from "./LoginButton";
import { isLoggedIn, save } from "../../service/storage/cookies.js";
import { loginUser } from "../../service/user.api.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn()) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser({ username, password });
      save.token(res.data.token);
      save.username(res.data.username);
      save.role(res.data.role);
      save.id(res.data.id);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        required
      />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required
      />

      <LoginButton disabled={loading} />
    </Form>
  );
};

export default LoginForm;