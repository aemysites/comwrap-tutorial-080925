/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the archive block
  const archive = element.querySelector('.w8-archive');
  if (!archive) return;

  // Table header as required
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  // Find all card items
  const cards = archive.querySelectorAll('.w8-archive__dwl');
  cards.forEach((card) => {
    // Image cell
    const img = card.querySelector('img');

    // Text cell: Title, Description, CTA
    const textContainer = document.createElement('div');
    // Title
    const title = card.querySelector('.w8-archive__dwlTitle');
    if (title) {
      // Use heading element as-is
      textContainer.appendChild(title);
    }
    // Description (optional, but always present as empty <p> in this HTML)
    const desc = card.querySelector('.w8-archive__dwlText');
    if (desc && desc.textContent.trim()) {
      textContainer.appendChild(desc);
    }
    // CTA link
    const link = card.querySelector('.w8-archive__dwlLink');
    if (link) {
      // Place link at the bottom
      textContainer.appendChild(link);
    }
    rows.push([img, textContainer]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
