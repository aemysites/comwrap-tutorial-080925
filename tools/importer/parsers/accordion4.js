/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the accordion/filter root
  const filters = element.querySelector('.s7-filters');
  if (!filters) return;

  // Find all filter groups (accordion items)
  const filterGroups = filters.querySelectorAll('.s7-filters__filter');
  if (!filterGroups.length) return;

  // Header row as required
  const headerRow = ['Accordion (accordion4)'];
  const rows = [headerRow];

  filterGroups.forEach((group) => {
    // Title: the button label
    const titleBtn = group.querySelector('.s7-filters__label');
    let titleCell = '';
    if (titleBtn) {
      // Use the button element directly for formatting (bold, etc)
      titleCell = titleBtn;
    }

    // Content: the dropdown div (list of checkboxes, etc)
    const contentDiv = group.querySelector('.s7-filters__dropdown');
    let contentCell = '';
    if (contentDiv) {
      contentCell = contentDiv;
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
