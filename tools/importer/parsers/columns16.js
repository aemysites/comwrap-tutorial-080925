/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Columns (columns16)'];

  // Get the main content wrapper
  const itemContent = element.querySelector('.s19-campaigns__itemContent');
  if (!itemContent) return;

  // Get the image column (left)
  const picture = itemContent.querySelector('picture');
  // Defensive: ensure picture exists
  let leftCell = picture || '';

  // Get the text column (right)
  const itemData = itemContent.querySelector('.s19-campaigns__itemData');
  let rightCell = '';
  if (itemData) {
    // We'll combine the date and title (with link) into a single cell
    // Defensive: get date
    const date = itemData.querySelector('.s19-campaigns__itemDate');
    // Defensive: get link and title
    const link = itemData.querySelector('a');
    let title = '';
    if (link) {
      const h3 = link.querySelector('h3');
      if (h3) {
        title = h3;
      }
    }
    // Compose cell content
    const cellContent = [];
    if (date) cellContent.push(date);
    if (link && title) {
      // Wrap the title in the link
      // Use the link element directly, but ensure only the h3 is inside
      // Defensive: remove any other children from link
      link.innerHTML = '';
      link.appendChild(title);
      cellContent.push(link);
    } else if (title) {
      cellContent.push(title);
    }
    rightCell = cellContent.length > 0 ? cellContent : '';
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
