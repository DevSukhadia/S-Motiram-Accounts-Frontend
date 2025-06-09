// components/Navbar.js
import { Link } from "react-router-dom";
import LogoutButton from "./buttons/LogoutButton";
import { get } from "../service/storage/cookies";

const Navbar = () => {
  const role = get.role();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {role === "Admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
            )}
            {/* Add more links here as needed */}
          </ul>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
