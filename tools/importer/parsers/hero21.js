/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active slide, fallback to first slide if none active
  const activeSlide = element.querySelector('.w3-carousel__oSlide--active') || element.querySelector('.w3-carousel__oSlide');
  if (!activeSlide) return;

  // Compose all text content from the active slide
  const contentFragments = [];
  // Get all children in order, not just specific classes
  activeSlide.childNodes.forEach((node) => {
    if (node.nodeType === 1) { // Element
      // Clone the node to preserve structure (e.g. <a>, <div>)
      contentFragments.push(node.cloneNode(true));
    } else if (node.nodeType === 3 && node.textContent.trim()) { // Text node
      contentFragments.push(document.createTextNode(node.textContent));
    }
  });

  // Table rows
  const headerRow = ['Hero (hero21)'];
  const imageRow = ['']; // No image in HTML
  const contentRow = [contentFragments];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
