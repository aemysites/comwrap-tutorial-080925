/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid icons block
  const gridIcons = element.querySelector('.w12-grid-icons');
  if (!gridIcons) return;

  // Find the carousel track containing all slides
  const track = gridIcons.querySelector('.w12-grid-icons__track');
  if (!track) return;

  // Get all slide elements
  const slides = Array.from(track.querySelectorAll('.w12-grid-icons__slide'));

  // Table header row
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Defensive: Find slide container
    const container = slide.querySelector('.w12-grid-icons__slideContainer');
    if (!container) return;

    // Find image (first cell)
    const img = container.querySelector('img');
    // Defensive: Only add if image exists
    const imageCell = img ? img : '';

    // Find description paragraph
    const desc = container.querySelector('.w12-grid-icons__slideDescription');
    // Find CTA link
    const cta = container.querySelector('.w12-grid-icons__slideCta');

    // Compose text cell
    const textCellContent = [];
    if (desc) textCellContent.push(desc);
    if (cta) textCellContent.push(cta);

    // Defensive: If no description or CTA, fallback to empty string
    const textCell = textCellContent.length ? textCellContent : '';

    // Add row: [image, text]
    rows.push([imageCell, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
