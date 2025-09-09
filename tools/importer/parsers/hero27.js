/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main content wrapper
  const mainDiv = element.querySelector(':scope > div');
  if (!mainDiv) return;

  // Get the image (background or hero image)
  const img = mainDiv.querySelector('img');

  // Get the text content container
  const txtDiv = mainDiv.querySelector('.w21-heading-image__txt');
  let textContent = null;
  if (txtDiv) {
    // Only include non-empty elements that are NOT <hr>
    const txtChildren = Array.from(txtDiv.children).filter(e => e && e.tagName !== 'HR' && e.textContent.trim());
    if (txtChildren.length === 1) {
      textContent = txtChildren[0];
    } else if (txtChildren.length > 1) {
      // Wrap in a div for grouping
      const groupDiv = document.createElement('div');
      txtChildren.forEach(child => groupDiv.appendChild(child));
      textContent = groupDiv;
    }
  }

  // Table rows
  const headerRow = ['Hero (hero27)'];
  const imageRow = [img ? img : ''];
  const contentRow = [textContent ? textContent : ''];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
