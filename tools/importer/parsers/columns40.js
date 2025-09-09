/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content wrapper
  const contentRoot = element.querySelector('.w5-text-image');
  if (!contentRoot) return;

  // Get the left column: description (richtext)
  const descWrapper = contentRoot.querySelector('.w5-text-image__description');
  // Defensive: fallback to the first .c1-richtext inside descWrapper
  let leftCol = null;
  if (descWrapper) {
    leftCol = descWrapper.querySelector('.c1-richtext') || descWrapper;
  }

  // Get the right column: image (picture)
  const picWrapper = contentRoot.querySelector('.w5-text-image__picture');
  let rightCol = null;
  if (picWrapper) {
    // Use the <picture> element if present, else the wrapper
    rightCol = picWrapper.querySelector('picture') || picWrapper;
  }

  // Build the table rows
  const headerRow = ['Columns (columns40)'];
  const contentRow = [leftCol, rightCol].map(col => col || '');

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
