/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main container of columns
  const container = element.querySelector('.s8-footer__topContainer');
  if (!container) return;

  // Get all direct column boxes
  const columns = Array.from(container.children);

  // Build the header row
  const headerRow = ['Columns (columns28)'];

  // Build the columns row by referencing each box as a cell
  const columnsRow = columns.map((col) => col);

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
