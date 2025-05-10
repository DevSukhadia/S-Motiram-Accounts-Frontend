import React, { useState } from "react";
import Form from "../shared/Form";
import Label from "../shared/Label";
import Input from "../shared/Input";
import LoginButton from "./LoginButton";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />

      <LoginButton username={username} password={password} />
    </Form>
  );
};

export default LoginForm;
