import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../service/storage/cookies"; // Adjust path if needed

const RequireAdmin = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(null); // null = checking
  const navigate = useNavigate();

  useEffect(() => {
    const role = get.role();
    if (role === "Admin") {
      setIsAllowed(true);
    } else {
      navigate("/Dashboard"); // Redirect if not admin
    }
  }, [navigate]);

  if (isAllowed === null) return null; // Skip rendering during check

  return children;
};

export default RequireAdmin;
