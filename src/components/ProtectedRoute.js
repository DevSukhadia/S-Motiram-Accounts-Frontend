import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../service/storage/cookies";

export default function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" />;
}
