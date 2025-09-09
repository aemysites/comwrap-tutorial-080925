/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container
  const grid = element.querySelector('.w12-grid-icons__carousel .w12-grid-icons__track');
  if (!grid) return;

  // Get all slides (columns)
  const slides = Array.from(grid.children).filter(child => child.classList.contains('w12-grid-icons__slide'));
  if (slides.length === 0) return;

  // Each slide becomes a column cell. We want to preserve the icon, title, and description as a block.
  const columnCells = slides.map(slide => {
    // The slideContainer holds all content for a column
    const container = slide.querySelector('.w12-grid-icons__slideContainer');
    return container || slide; // fallback to slide if structure changes
  });

  // Build the table rows
  const headerRow = ['Columns (columns29)'];
  const columnsRow = columnCells;
  const tableRows = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
