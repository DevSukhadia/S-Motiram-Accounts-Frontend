import React from "react";
import LogoutButton from "../components/buttons/LogoutButton";
import CreateUserForm from "../components/CreateUserForm";
import { get } from "../service/storage/cookies";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>
      {get.role() === "Admin" && (
        <CreateUserForm />
      )}      
    </div>
  );
};

export default Dashboard;
// This component serves as the main dashboard for the admin user. It includes a title and a logout button, and it renders the CreateUser component for creating new users. The layout is styled using Bootstrap classes for better presentation.