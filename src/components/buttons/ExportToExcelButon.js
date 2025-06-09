// components/ExportToExcelButton.jsx
import React from "react";
import { exportToExcel } from "../../utils/exportToExcel";

export default function ExportToExcelButton({ data, fileName, headers }) {
  const handleExport = () => {
    exportToExcel({ data, fileName, headers });
  };

  return (
    <button className="btn btn-success mb-3" onClick={handleExport}>
      Export to Excel
    </button>
  );
}
