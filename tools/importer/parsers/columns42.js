/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main filters container
  const filters = element.querySelector('.s7-filters');
  if (!filters) return;

  // Find the filters form
  const form = filters.querySelector('.s7-filters__form');
  if (!form) return;

  // Get the filters row (Cooperative, Anno)
  const filtersRow = form.querySelector('.s7-filters__filters');
  // Get the "In evidenza" checkbox
  const highlightDiv = form.querySelector('.s7-filters__checkboxes');

  // Defensive: Get each filter block (should be two: Cooperative, Anno)
  let filterBlocks = [];
  if (filtersRow) {
    filterBlocks = Array.from(filtersRow.children);
  }

  // Get the Cooperative filter label/button
  const coopFilter = filterBlocks[0] ? filterBlocks[0].querySelector('.s7-filters__label') : null;
  // Get the Anno filter label/button
  const yearFilter = filterBlocks[1] ? filterBlocks[1].querySelector('.s7-filters__label') : null;
  // Get the "In evidenza" label
  const highlightLabel = highlightDiv ? highlightDiv.querySelector('.label') : null;
  const highlightInput = highlightDiv ? highlightDiv.querySelector('input[type="checkbox"]') : null;

  // Compose the columns for the second row
  // Column 1: Cooperative filter
  // Column 2: Anno filter
  // Column 3: In evidenza
  const contentRow = [];

  // Column 1: Cooperative (include all text content)
  if (coopFilter) {
    contentRow.push(coopFilter.textContent.trim());
  } else {
    contentRow.push('Cooperative');
  }

  // Column 2: Anno (include all text content)
  if (yearFilter) {
    contentRow.push(yearFilter.textContent.trim());
  } else {
    contentRow.push('Anno');
  }

  // Column 3: In evidenza (include checkbox and label text)
  if (highlightLabel && highlightInput) {
    const label = document.createElement('label');
    label.appendChild(highlightInput.cloneNode(true));
    label.appendChild(document.createTextNode(' ' + highlightLabel.textContent.trim()));
    contentRow.push(label);
  } else if (highlightLabel) {
    contentRow.push(highlightLabel.textContent.trim());
  } else {
    contentRow.push('In evidenza');
  }

  // Build table rows
  const headerRow = ['Columns (columns42)'];
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
