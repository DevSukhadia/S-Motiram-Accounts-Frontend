import { useEffect, useState } from "react";
import API from "../../service/API";
import { get } from "../../service/storage/cookies";
import TransactionFilters from "./TransactionFilters";

export default function FinancialSummary({ companyId }) {
  const [summary, setSummary] = useState({ income: { total: 0, tax: 0 }, expense: { total: 0, tax: 0 } });
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("ALL");
  const [administeredByFilter, setAdministeredByFilter] = useState("ALL");
  const [companyUsers, setCompanyUsers] = useState([]);

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
        alert("Could not load monthly summary data");
      });
  }, [companyId, isAdmin]);

  useEffect(() => {
    let filtered = [...allTransactions];

    if (isAdmin && administeredByFilter !== "ALL") {
      filtered = filtered.filter(tx => tx.ADMINISTERED_BY === administeredByFilter);
    }

    filtered = filtered.filter(tx => {
      const date = new Date(tx.TRANSACTION_DATE);
      return date >= new Date(fromDate) && date <= new Date(toDate);
    });

    const incomeTransactions = filtered.filter(tx => tx.TRANSACTION_TYPE === "INCOME");
    const expenseTransactions = filtered.filter(tx => tx.TRANSACTION_TYPE === "EXPENSE");

    const incomeTotal = incomeTransactions.reduce((sum, tx) => sum + parseFloat(tx.AMOUNT), 0);
    const incomeTax = incomeTransactions.reduce((sum, tx) => sum + parseFloat(tx.TAX), 0);
    const expenseTotal = expenseTransactions.reduce((sum, tx) => sum + parseFloat(tx.AMOUNT), 0);
    const expenseTax = expenseTransactions.reduce((sum, tx) => sum + parseFloat(tx.TAX), 0);

    setSummary({
      income: { total: incomeTotal, tax: incomeTax },
      expense: { total: expenseTotal, tax: expenseTax },
    });
  }, [transactionTypeFilter, administeredByFilter, fromDate, toDate, allTransactions, isAdmin]);

  const totalCollected = summary.income.total + summary.income.tax;
  const totalPaid = summary.expense.total + summary.expense.tax;

  return (
    <div className="mb-4 card border-primary p-4">
      <h4 className="text-primary mb-4">Financial Summary</h4>

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
        showTransactionTypeFilter={false}
      />

      <div className="row">
        {/* Income Box */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm p-3 border-success">
            <h5 className="text-success mb-3">Income Summary</h5>
            <p><strong>Amount Collected:</strong> ₹ {summary.income.total.toFixed(2)}</p>
            <p><strong>Tax Collected:</strong> ₹ {summary.income.tax.toFixed(2)}</p>
            <p><strong>Total Collected:</strong> ₹ {totalCollected.toFixed(2)}</p>
          </div>
        </div>

        {/* Expense Box */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm p-3 border-danger">
            <h5 className="text-danger mb-3">Expense Summary</h5>
            <p><strong>Amount Paid:</strong> ₹ {summary.expense.total.toFixed(2)}</p>
            <p><strong>Tax Paid:</strong> ₹ {summary.expense.tax.toFixed(2)}</p>
            <p><strong>Total Paid:</strong> ₹ {totalPaid.toFixed(2)}</p>
          </div>
        </div>
        {/* Net Balance Box */}
        <div className="col-md-12">
          <div className="card shadow-sm p-3 border-info">
            <h5 className="text-info mb-3">Net Balance</h5>
            <p><strong>Amount Balance:</strong> ₹ {(summary.income.total - summary.expense.total).toFixed(2)} &nbsp;&nbsp;|&nbsp;&nbsp;
            <strong>Tax Balance:</strong> ₹ {(summary.income.tax - summary.expense.tax).toFixed(2)} &nbsp;&nbsp;|&nbsp;&nbsp;
            <strong>Net Balance:</strong> ₹ {(totalCollected - totalPaid).toFixed(2)}</p>
          </div> 
          </div>  
      </div>
    </div>
  );
}
// import { useMemo } from "react";