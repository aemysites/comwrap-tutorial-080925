/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main boxes container
  const boxes = element.querySelector('.w4-icons-boxes__carousel .w4-icons-boxes__track');
  if (!boxes) return;

  // Get all slides (columns)
  const slides = Array.from(boxes.children).filter(child => child.classList.contains('w4-icons-boxes__slide'));
  if (slides.length === 0) return;

  // Each slide is a column: collect the full content of each slide
  const columns = slides.map(slide => {
    // Wrap slide content in a div for better isolation
    const wrapper = document.createElement('div');
    // Move all children into the wrapper
    while (slide.firstChild) {
      wrapper.appendChild(slide.firstChild);
    }
    return wrapper;
  });

  // Build the table rows
  const headerRow = ['Columns (columns26)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
