import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";
import "bootstrap/dist/css/bootstrap.min.css";

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
    </Routes>
  );
}

export default App;
