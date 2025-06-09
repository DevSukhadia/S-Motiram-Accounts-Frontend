import Navbar from "../components/Navbar";
import CreateUserForm from "../components/CreateUserForm";
import RequireAdmin from "../components/protected/RequireAdmin";

const Users = () => {
  return (
    <RequireAdmin>
      <Navbar />
      <div className="container">
        <h2>User Management</h2>
        <CreateUserForm />
      </div>
    </RequireAdmin>
  );
};

export default Users;
