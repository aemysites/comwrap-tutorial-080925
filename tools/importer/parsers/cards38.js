/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the track containing all slides
  const track = element.querySelector('.w4-icons-boxes__track');
  if (!track) return;

  // Get all slides (cards)
  const slides = Array.from(track.children).filter(
    (el) => el.classList.contains('w4-icons-boxes__slide')
  );

  // Table header
  const headerRow = ['Cards (cards38)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Icon (first cell)
    const icon = slide.querySelector('.w4-icons-boxes__slideIcon');

    // Text content (second cell)
    // Title
    const title = slide.querySelector('.w4-icons-boxes__slideTitle');
    // Description (short)
    const desc = slide.querySelector('.w4-icons-boxes__slideDescription');
    // Extra text (long description, optional)
    const extra = slide.querySelector('.w4-icons-boxes__slideText');

    // Compose text cell
    const textCellContent = [];
    if (title) {
      // Make title bold (simulate heading)
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCellContent.push(strong);
    }
    if (desc) {
      textCellContent.push(document.createElement('br'));
      textCellContent.push(desc.cloneNode(true));
    }
    if (extra) {
      textCellContent.push(document.createElement('br'));
      textCellContent.push(extra.cloneNode(true));
    }

    // Defensive: if no text, fallback to slide
    const textCell = textCellContent.length ? textCellContent : [slide.cloneNode(true)];

    rows.push([
      icon ? icon.cloneNode(true) : '',
      textCell,
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
