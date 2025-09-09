/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards container
  const boxes = element.querySelector('.w11-presets__boxes');
  if (!boxes) return;

  // Table header row
  const headerRow = ['Cards (cards44)'];
  const rows = [headerRow];

  // Find all card links (each card is an <a> inside .w11-presets__boxes)
  const cards = boxes.querySelectorAll('.w11-presets__box');

  cards.forEach((card) => {
    // Image: find <picture> inside the card
    const picture = card.querySelector('picture');
    if (!picture) return;

    // Text content: create a wrapper div to hold all text elements
    const textWrapper = document.createElement('div');
    // Title (h3)
    const title = card.querySelector('.w11-presets__boxTitle');
    if (title) textWrapper.appendChild(title.cloneNode(true));
    // Description (try to find any paragraph or span that isn't the CTA)
    // In this HTML, there is no description, but let's look for it anyway
    const boxContent = card.querySelector('.w11-presets__boxContent');
    if (boxContent) {
      // Find all child nodes except the title and CTA
      Array.from(boxContent.childNodes).forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          !node.classList.contains('w11-presets__boxTitle') &&
          !node.classList.contains('w11-presets__boxCta')
        ) {
          textWrapper.appendChild(node.cloneNode(true));
        }
      });
    }
    // CTA (span, usually at the bottom)
    const cta = card.querySelector('.w11-presets__boxCta');
    if (cta) textWrapper.appendChild(cta.cloneNode(true));

    // Each row: [image, text content]
    rows.push([picture.cloneNode(true), textWrapper]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
