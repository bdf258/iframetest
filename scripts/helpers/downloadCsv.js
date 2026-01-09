/**
 * Download a CSV string as a file.
 *
 * @param {string} csv                    Formatted CSV content.
 * @param {string} [filename="data.csv"]  Target filename; ".csv" will be added if missing.
 * @param {{ addBOM?: boolean }} [options]   Options: set addBOM = false to omit the UTF-8 BOM.
 */
const downloadCsv = (csv, filename = "data.csv", options = {}) => {
  const { addBOM = true } = options;

  // Add a .csv extension if missing.
  const name = /\.[Cc][Ss][Vv]$/.test(filename) ? filename : `${filename}.csv`;

  const normalized = String(csv).replace(/\r?\n/g, "\r\n");

  // Prepend UTF-8 BOM (Byte order mark) basically tells Excel and Sheets when they start streaming the CSV data that the file is UTF-8 encoded.
  const BOM = addBOM ? "\uFEFF" : "";
  const payload = BOM + normalized;

  const blob = new Blob([payload], { type: "text/csv;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.setAttribute("download", name);

  document.body.appendChild(a);

  try {
    a.click();
  } finally {
    a.remove();
    URL.revokeObjectURL(url);
  }
};
export default downloadCsv;
