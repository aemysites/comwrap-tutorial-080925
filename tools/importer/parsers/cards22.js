/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel track containing all slides
  const track = element.querySelector('.w12-grid-icons__track');
  if (!track) return;

  // Get all slide elements (each card)
  const slides = Array.from(track.children).filter(slide => slide.classList.contains('w12-grid-icons__slide'));

  // Table header row
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  slides.forEach(slide => {
    // Defensive: Find slide container
    const container = slide.querySelector('.w12-grid-icons__slideContainer');
    if (!container) return;

    // --- First cell: Image or Icon ---
    let mediaEl = container.querySelector('img, .w12-grid-icons__slideIcon');
    // Defensive: If no image or icon, skip this card
    if (!mediaEl) return;

    // --- Second cell: Text content ---
    const cellContent = [];

    // Title (as heading)
    const titleEl = container.querySelector('.w12-grid-icons__slideTitle');
    if (titleEl) {
      // Wrap title in <strong> for heading style
      const heading = document.createElement('strong');
      heading.textContent = titleEl.textContent.trim();
      cellContent.push(heading);
    }

    // Description (optional)
    const descEl = container.querySelector('.w12-grid-icons__slideDescription');
    if (descEl && descEl.textContent.trim()) {
      cellContent.push(document.createElement('br'));
      cellContent.push(descEl);
    }

    // CTA link (optional)
    const ctaEl = container.querySelector('.w12-grid-icons__slideCta');
    if (ctaEl) {
      cellContent.push(document.createElement('br'));
      cellContent.push(ctaEl);
    }

    rows.push([mediaEl, cellContent]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(block);
}
