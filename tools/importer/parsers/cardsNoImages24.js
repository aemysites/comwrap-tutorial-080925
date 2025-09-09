/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element contains the expected card articles
  const articles = Array.from(element.querySelectorAll(':scope > .w16-board__article'));
  if (!articles.length) return;

  // Header row as per block guidelines
  const headerRow = ['Cards (cardsNoImages24)'];

  // Each card/article becomes a row
  const rows = articles.map((article) => {
    // We'll assemble the card content in a fragment for resilience
    const frag = document.createDocumentFragment();

    // Date (optional, as a span)
    const date = article.querySelector('.w16-board__articleDate');
    if (date) frag.appendChild(date);

    // Title (h3)
    const title = article.querySelector('.w16-board__articleTitle');
    if (title) frag.appendChild(title);

    // Description (p)
    const desc = article.querySelector('.w16-board__articleText');
    if (desc) frag.appendChild(desc);

    // CTA (a)
    const cta = article.querySelector('.w16-board__articleCta');
    if (cta) frag.appendChild(cta);

    return [frag];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
