// components/accounts/TransactionFilters.js
export default function TransactionFilters({
    isAdmin,
    transactionTypeFilter,
    setTransactionTypeFilter,
    adminFilter,
    setAdministeredByFilter,
    companyUsers,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    showTransactionTypeFilter = true,
    showFromDateFilter = true,
    showToDateFilter = true,
}) {
  return (
    <div className="d-flex flex-wrap gap-3 mb-3">
        {/* From Date Filter */}
        { showFromDateFilter && (
            <div className="col-me-2">
            <label className="form-label">From Date</label>
            <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            />
        </div>
        )}
        {/* To Date Filter */}
        { showToDateFilter && (
            <div className="col-me-2">
            <label className="form-label">To Date</label>
            <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            />
        </div>
        )}
      {/* Transaction Type Filter */}
      { showTransactionTypeFilter && (
        <div>
        <label className="form-label me-2">Type:</label>
        <select
          className="form-select"
          value={transactionTypeFilter}
          onChange={(e) => setTransactionTypeFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
      </div>
      )}

      {/* Admin Filter */}
      {isAdmin && (
        <div>
          <label className="form-label me-2">Administered By:</label>
          <select
            className="form-select"
            value={adminFilter}
            onChange={(e) => setAdministeredByFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            {companyUsers.map((admin) => (
              <option key={admin} value={admin}>
                {admin}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
