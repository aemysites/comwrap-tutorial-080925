/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards14)'];
  const rows = [headerRow];

  // Defensive: Find the carousel track containing all cards
  const track = element.querySelector('.w4-icons-boxes__track');
  if (!track) return;

  // Each card is a .w4-icons-boxes__slide
  const slides = Array.from(track.children).filter(child => child.classList.contains('w4-icons-boxes__slide'));

  slides.forEach((slide) => {
    // --- Icon cell ---
    // The icon is a span with class .w4-icons-boxes__slideIcon
    const icon = slide.querySelector('.w4-icons-boxes__slideIcon');
    // Defensive: If no icon, skip this card
    if (!icon) return;

    // --- Text cell ---
    const textContent = [];

    // Title (number)
    const title = slide.querySelector('.w4-icons-boxes__slideTitle');
    if (title) {
      // Make it a heading (strong)
      const heading = document.createElement('strong');
      heading.innerHTML = title.innerHTML;
      heading.style.color = title.style.color;
      textContent.push(heading);
    }

    // Description (main label)
    const desc = slide.querySelector('.w4-icons-boxes__slideDescription');
    if (desc) {
      // Use a div for description
      const descDiv = document.createElement('div');
      descDiv.innerHTML = desc.innerHTML;
      descDiv.style.fontWeight = 'bold';
      textContent.push(descDiv);
    }

    // Extra text (optional)
    const extra = slide.querySelector('.w4-icons-boxes__slideText');
    if (extra) {
      const extraDiv = document.createElement('div');
      extraDiv.innerHTML = extra.innerHTML;
      extraDiv.style.fontSize = 'smaller';
      textContent.push(extraDiv);
    }

    // Add row: [icon, textContent]
    rows.push([
      icon,
      textContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
