/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a card cell from a .w16-board__article element
  function createCardCell(article) {
    // Defensive: get children by class
    const date = article.querySelector('.w16-board__articleDate');
    const title = article.querySelector('.w16-board__articleTitle');
    const desc = article.querySelector('.w16-board__articleText');
    const cta = article.querySelector('.w16-board__articleCta');

    // Compose the card content
    const fragment = document.createElement('div');
    if (date) {
      const dateP = document.createElement('p');
      dateP.append(date);
      fragment.append(dateP);
    }
    if (title) {
      // Use h3 as is
      fragment.append(title);
    }
    if (desc) {
      fragment.append(desc);
    }
    if (cta) {
      const ctaP = document.createElement('p');
      ctaP.append(cta);
      fragment.append(ctaP);
    }
    return fragment;
  }

  // Find all article cards
  const articlesContainer = element.querySelector('.w16-board__articles');
  const articles = articlesContainer ? Array.from(articlesContainer.children) : [];

  // Build table rows
  const rows = [];
  // Header row as per block spec
  rows.push(['Cards (cardsNoImages11)']);
  // Each card row
  articles.forEach((article) => {
    rows.push([createCardCell(article)]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
