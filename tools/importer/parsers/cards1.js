/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the cards container
  const boxesContainer = element.querySelector('.w11-presets__boxes');
  if (!boxesContainer) return;

  // Get all card elements
  const cardLinks = Array.from(boxesContainer.querySelectorAll('.w11-presets__box'));
  if (!cardLinks.length) return;

  // Table header
  const headerRow = ['Cards (cards1)'];
  const rows = [headerRow];

  cardLinks.forEach((card) => {
    // Image: find <picture> or <img> inside the card
    const picture = card.querySelector('picture');
    let imageEl = null;
    if (picture) {
      imageEl = picture;
    } else {
      // fallback: find img
      const img = card.querySelector('img');
      if (img) imageEl = img;
    }

    // Text content cell
    const contentDiv = card.querySelector('.w11-presets__boxContent');
    const cellContent = [];
    if (contentDiv) {
      // Title
      const title = contentDiv.querySelector('.w11-presets__boxTitle');
      if (title) cellContent.push(title);
      // CTA
      const cta = contentDiv.querySelector('.w11-presets__boxCta');
      if (cta) cellContent.push(cta);
    }

    // Build row: [image, text content]
    rows.push([
      imageEl,
      cellContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
