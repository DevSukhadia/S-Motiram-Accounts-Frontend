import { get } from "../service/storage/cookies";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/accounts/TransactionForm";
import FinancialSummary from "../components/accounts/FinancialSummary";
import Transactions from "../components/accounts/Transactions";
import RequireAdminOrNull from "../components/protected/RequireAdminOrNull";

export default function Accounts() {
  const companyId = get.companyId();
  const comapanyName = get.companyName();

  return (
    <>
      <Navbar />
      <div>
      </div>
      <div className="container mt-4">
        <h2 className="text-center mt-4">{comapanyName}</h2>
        <hr />
        <TransactionForm companyId={companyId} />
        <RequireAdminOrNull>
            <FinancialSummary companyId={companyId} />
        </RequireAdminOrNull>
        <Transactions companyId={companyId} />
      </div>
    </>
  );
}
