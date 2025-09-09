/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel track containing all slides
  const track = element.querySelector('.w4-icons-boxes__track');
  if (!track) return;

  // Get all card slides
  const slides = Array.from(track.children).filter(
    (child) => child.classList.contains('w4-icons-boxes__slide')
  );

  // Table header row
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Find image
    const img = slide.querySelector('img');

    // Compose text cell
    const title = slide.querySelector('.w4-icons-boxes__slideTitle');
    const description = slide.querySelector('.w4-icons-boxes__slideDescription');
    const text = slide.querySelector('.w4-icons-boxes__slideText');

    // Create a container for text cell
    const textCell = document.createElement('div');
    if (title) {
      const h2 = document.createElement('h2');
      h2.innerHTML = title.innerHTML.trim();
      textCell.appendChild(h2);
    }
    if (description) {
      const desc = document.createElement('p');
      desc.innerHTML = description.innerHTML.trim();
      textCell.appendChild(desc);
    }
    if (text) {
      const txt = document.createElement('p');
      txt.innerHTML = text.innerHTML.trim();
      textCell.appendChild(txt);
    }

    rows.push([
      img,
      textCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
