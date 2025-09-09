/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track containing all cards
  const track = element.querySelector('.w4-icons-boxes__track');
  if (!track) return;

  // Get all card slides
  const slides = Array.from(track.children).filter(child => child.classList.contains('w4-icons-boxes__slide'));

  // Table header row: must match block name exactly
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Icon (first cell): reference the actual icon element
    const icon = slide.querySelector('.w4-icons-boxes__slideIcon');
    if (!icon) return; // Defensive: skip if icon missing

    // Text content (second cell)
    const title = slide.querySelector('.w4-icons-boxes__slideTitle');
    const desc = slide.querySelector('.w4-icons-boxes__slideDescription');

    // Compose text cell preserving structure
    const textCell = document.createElement('div');
    if (title && title.textContent.trim()) {
      // Use <strong> for heading, preserve color if present
      const heading = document.createElement('strong');
      heading.textContent = title.textContent.trim();
      if (title.style.color) heading.style.color = title.style.color;
      textCell.appendChild(heading);
      textCell.appendChild(document.createElement('br'));
    }
    if (desc && desc.textContent.trim()) {
      // Add description below heading
      const descSpan = document.createElement('span');
      descSpan.textContent = desc.textContent.trim();
      textCell.appendChild(descSpan);
    }

    rows.push([
      icon, // reference, do not clone
      textCell
    ]);
  });

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
