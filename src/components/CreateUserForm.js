import React, { useEffect, useState } from "react";
import Form from "./shared/Form";
import Label from "./shared/Label";
import Input from "./shared/Input";
import { fetchRoles } from "../service/roles.api"; // Adjust the import path as necessary
import { createUser } from "../service/user.api";

const CreateUserForm = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    roleId: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRoles()
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Failed to fetch roles", err));
  }, []);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.roleId) {
      newErrors.roleId = "Please select a role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    console.log("Form data before submission:", formData); // Debugging line

    try {
      await createUser(formData); // Assuming createUser is a function that handles the API call
      alert("User created successfully!");
      setFormData({
        username: "",
        password: "",
        email: "",
        roleId: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Error creating user", err);
      alert(err.response.data.error);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="mb-3">Create New User</h3>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          {errors.username && <div className="text-danger">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <Label htmlFor="roleId">Role</Label>
          <select
            className="form-select"
            id="roleId"
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.USER_ROLE_ID} value={role.USER_ROLE_ID}>
                {role.USER_ROLE_NAME}
              </option>
            ))}
          </select>
          {errors.roleId && <div className="text-danger">{errors.roleId}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Create User
        </button>
      </Form>
    </div>
  );
};

export default CreateUserForm;
