import { useEffect, useState } from "react";
import API from "../../service/API";
import { get } from "../../service/storage/cookies";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import ExportToExcelButton from "../buttons/ExportToExcelButon";

export default function Transactions({ companyId }) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [transactionTypeFilter, setTransactionTypeFilter] = useState("ALL");
  const [administeredByFilter, setAdministeredByFilter] = useState("ALL");
  const [companyUsers, setCompanyUsers] = useState([]);

  // Set default From and To as start and end of current month
 const today = new Date();

const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

const [fromDate, setFromDate] = useState(firstOfMonth.toLocaleDateString('sv-SE'));
const [toDate, setToDate] = useState(lastOfMonth.toLocaleDateString('sv-SE'));


  const role = get.role();
  const isAdmin = role === "Admin";

  useEffect(() => {
    API.get(`/transactions/list/${companyId}`)
      .then((res) => {
        setAllTransactions(res.data);
        setFilteredTransactions(res.data);

        if (isAdmin) {
          API.get(`/companies/users/${companyId}`)
            .then((res) => {
              const usernames = res.data.map((user) => user.USERNAME);
              setCompanyUsers(usernames);
            })
            .catch((err) => {
              console.error("Failed to load user list", err);
              setCompanyUsers([]);
            });
        }
      })
      .catch((err) => {
        console.error("Failed to load transactions", err);
        alert("Could not load monthly transactions");
      });
  }, [companyId, isAdmin]);

  useEffect(() => {
    let filtered = [...allTransactions];

    if (transactionTypeFilter !== "ALL") {
      filtered = filtered.filter(tx => tx.TRANSACTION_TYPE === transactionTypeFilter);
    }

    if (isAdmin && administeredByFilter !== "ALL") {
      filtered = filtered.filter(tx => tx.ADMINISTERED_BY === administeredByFilter);
    }

    if (fromDate && toDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0); // Normalize to start of day

        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999); // Normalize to end of day

        filtered = filtered.filter(tx => {
            const txDate = new Date(tx.TRANSACTION_DATE);
            return txDate >= from && txDate <= to;
        });
    }


    setFilteredTransactions(filtered);
  }, [
    transactionTypeFilter,
    administeredByFilter,
    fromDate,
    toDate,
    allTransactions,
    isAdmin,
  ]);

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h4 className="mb-3">Transactions</h4>

      

      <div className="d-flex flex-end justify-content-between">

        <TransactionFilters
        isAdmin={isAdmin}
        transactionTypeFilter={transactionTypeFilter}
        setTransactionTypeFilter={setTransactionTypeFilter}
        administeredByFilter={administeredByFilter}
        setAdministeredByFilter={setAdministeredByFilter}
        companyUsers={companyUsers}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <ExportToExcelButton
        data={filteredTransactions}
        fileName="Transaction_Report"
        headers={[
          { label: "Date", key: "TRANSACTION_DATE" },
          { label: "Type", key: "TRANSACTION_TYPE" },
          { label: "Category", key: "CATEGORY_NAME" },
          { label: "Description", key: "DESCRIPTION" },
          { label: "Amount", key: "AMOUNT" },
          { label: "Tax", key: "TAX" },
          ...(isAdmin ? [{ label: "Administered By", key: "ADMINISTERED_BY" }] : []),
        ]}
      />
      </div>
      {filteredTransactions.length === 0 ? (
        <p>No transactions match the selected filters.</p>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </div>
  );
}
