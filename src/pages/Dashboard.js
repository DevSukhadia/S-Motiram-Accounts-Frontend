import Navbar from "../components/Navbar";
import CompanyTable from "../components/CompaniesTable";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <Navbar />
      <h2>Your Companies</h2>
      <CompanyTable />
    </div>
  );
}