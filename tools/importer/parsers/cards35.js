/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the archive block
  const archive = element.querySelector('.w8-archive');
  if (!archive) return;

  // Find all card items
  const cards = archive.querySelectorAll('.w8-archive__dwl');
  if (!cards.length) return;

  // Table header as per block spec
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cards.forEach((card) => {
    // Image (mandatory)
    const img = card.querySelector('img');

    // Text content: Title (h4), Description (p), CTA (a)
    const title = card.querySelector('h4');
    const desc = card.querySelector('p');
    const link = card.querySelector('a');

    // Compose the text cell
    const textCellContent = [];
    if (title) textCellContent.push(title);
    // Only include description if it has non-empty text
    if (desc && desc.textContent.trim()) textCellContent.push(desc);
    if (link) textCellContent.push(link);

    // Defensive: If no text, fallback to empty string
    const textCell = textCellContent.length ? textCellContent : [''];

    // Add row: [image, text cell]
    rows.push([img, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
