// utils/exportToExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Exports data to Excel format.
 * @param {Array} data - The array of objects to export.
 * @param {string} fileName - The name of the Excel file.
 * @param {Array} headers - Optional. Array of { label, key } to rename/export specific fields.
 */
export function exportToExcel({ data, fileName = "export", headers = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Map headers if provided
  const formattedData = headers.length
    ? data.map((item) =>
        headers.reduce((acc, header) => {
          acc[header.label] = item[header.key];
          return acc;
        }, {})
      )
    : data;

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
}
