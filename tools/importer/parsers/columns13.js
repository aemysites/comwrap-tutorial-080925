/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.children || element.children.length === 0) return;

  // Find all direct child slides
  const slides = Array.from(element.querySelectorAll(':scope > div.w3-carousel__bSlide'));

  // For each slide, extract the title (as a div)
  const columns = slides.map((slide) => {
    const title = slide.querySelector('.w3-carousel__bSlideTitle');
    return title ? title.textContent : '';
  });

  // Build the table rows: header row must be a single column
  const rows = [ ['Columns (columns13)'], columns ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // CRITICAL FIX: Ensure header row contains exactly one column
  // Remove any extra ths from the header row
  const thead = block.querySelector('thead');
  if (thead) {
    const tr = thead.querySelector('tr');
    if (tr) {
      const ths = tr.querySelectorAll('th');
      for (let i = 1; i < ths.length; i++) {
        ths[i].remove();
      }
    }
  }

  // Replace the original element with the block table
  element.replaceWith(block);
}
