import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/API"; // Make sure this path is correct

export default function CompanyTable() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  // Fetch companies for the logged-in user
  const fetchUserCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error("Error fetching companies", err);
    }
  };

  // Navigate to accounts page
  const goToAccounts = (companyId) => {
    navigate(`/account`);
  };

  useEffect(() => {
    fetchUserCompanies();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Company Name</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.COMPANY_ID}>
            <td>
              <button
                className="btn"
                onClick={() => goToAccounts(company.COMPANY_ID)}
              >
                {company.COMPANY_NAME}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
