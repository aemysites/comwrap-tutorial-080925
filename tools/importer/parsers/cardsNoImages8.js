/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all card content blocks
  const cards = [];

  // Find the main text container
  const textContainer = element.querySelector('.w15-paragraphs__text');
  if (!textContainer) return;

  // Each card is a .w15-paragraphs_single
  const cardBlocks = textContainer.querySelectorAll(':scope > .w15-paragraphs_single');

  cardBlocks.forEach((cardBlock) => {
    // Card content: rich description
    const richDesc = cardBlock.querySelector('.w15-paragraphs__richDescription');
    // Find CTA if present (it is outside the richDesc, but inside the same cardBlock)
    const cta = cardBlock.querySelector('a.w15-paragraphs__cta');

    // Compose card cell content
    const cellContent = [];
    if (richDesc) cellContent.push(richDesc);
    if (cta) cellContent.push(cta);
    cards.push([cellContent.length === 1 ? cellContent[0] : cellContent]);
  });

  // Table header as per block spec
  const headerRow = ['Cards (cardsNoImages8)'];
  const tableRows = [headerRow, ...cards];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
