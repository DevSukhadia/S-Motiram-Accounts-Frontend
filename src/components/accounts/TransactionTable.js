import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { DateTime } from "luxon";
import { get } from "../../service/storage/cookies";

export default function TransactionTable({ transactions }) {
  const isAdmin = useMemo(() => get.role() === "Admin", []);

  const data = useMemo(() => transactions || [], [transactions]);

  const columns = useMemo(() => {
    const formatCurrency = (value) => `₹ ${parseFloat(value).toFixed(2)}`;

    const baseColumns = [
      {
        Header: "Date",
        accessor: (row) =>
          DateTime.fromISO(row.TRANSACTION_DATE)
            .setZone("Asia/Kolkata")
            .toFormat("dd LLL yyyy, hh:mm a"),
      },
      { Header: "Type", accessor: "TRANSACTION_TYPE" },
      { Header: "Category", accessor: "CATEGORY_NAME" },
      { Header: "Description", accessor: "DESCRIPTION" },
      {
        Header: "Amount",
        accessor: (row) => formatCurrency(row.AMOUNT),
      },
      {
        Header: "Tax",
        accessor: (row) => formatCurrency(row.TAX),
      },
    ];

    if (isAdmin) {
      baseColumns.push({
        Header: "Administered By",
        accessor: "ADMINISTERED_BY",
      });
    }

    return baseColumns;
  }, [isAdmin]);

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="table-responsive">

      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead className="table-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="sortable"
                  key={column.id}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : " ⬍"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No transactions found.
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
