/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left column (text + button)
  const description = element.querySelector('.w5-text-image__description');
  // Find the right column (image)
  const picture = element.querySelector('.w5-text-image__picture');

  // Defensive: fallback if not found
  const leftCol = description || element;
  const rightCol = picture || null;

  // Table header must match block name exactly
  const headerRow = ['Columns (columns41)'];
  // Second row: left column (text + button), right column (image)
  const row = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, row];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
