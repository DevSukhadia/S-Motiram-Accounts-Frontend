import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./pages/Users.js";
import Account from "./pages/Account.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
