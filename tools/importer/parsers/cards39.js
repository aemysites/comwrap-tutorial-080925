/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create the text cell for each card
  function createTextCell(box) {
    const contentDiv = box.querySelector('.w11-presets__boxContent');
    if (!contentDiv) return '';
    // Title
    const title = contentDiv.querySelector('.w11-presets__boxTitle');
    // CTA (span, but should be a link)
    const ctaSpan = contentDiv.querySelector('.w11-presets__boxCta');
    let ctaLink = null;
    if (ctaSpan) {
      // Wrap CTA text in a link to the card's href
      const href = box.getAttribute('href');
      if (href) {
        ctaLink = document.createElement('a');
        ctaLink.href = href;
        ctaLink.textContent = ctaSpan.textContent;
        ctaLink.className = ctaSpan.className || '';
      }
    }
    // Compose cell: title (h3), CTA link (if present)
    const cellContent = [];
    if (title) cellContent.push(title);
    if (ctaLink) cellContent.push(document.createElement('br'), ctaLink);
    return cellContent;
  }

  // Find all card links
  const cards = Array.from(element.querySelectorAll(':scope > a.w11-presets__box'));

  // Build table rows
  const rows = [
    ['Cards (cards39)'], // header row
  ];

  cards.forEach((card) => {
    // Image: use the <picture> element directly
    const picture = card.querySelector('picture');
    // Text cell: title + CTA as link
    const textCell = createTextCell(card);
    rows.push([
      picture || '',
      textCell,
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
