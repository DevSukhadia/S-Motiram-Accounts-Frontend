import { useEffect, useState } from "react";
import { get } from "../../service/storage/cookies"; // Adjust path if needed

const RequireAdminOrNull = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); // null = checking

  useEffect(() => {
    setIsAdmin(get.role() === "Admin");
  }, []);

  if (!isAdmin) return null; // while checking or not admin

  return children;
};

export default RequireAdminOrNull;