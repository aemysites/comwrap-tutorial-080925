/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the news content container
  const newsContent = element.querySelector('.w19-latest-news__content');
  if (!newsContent) return;

  // Get all card items
  const cardItems = Array.from(newsContent.querySelectorAll(':scope > .w19-latest-news__item'));

  // Table header
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  cardItems.forEach((item) => {
    // Defensive: find the inner content container
    const content = item.querySelector('.w19-latest-news__itemContent');
    if (!content) return;

    // Find image (picture element)
    const picture = content.querySelector('picture');

    // Compose text cell
    const textParts = [];

    // Category (span)
    const category = content.querySelector('.w19-latest-news__itemCategory');
    if (category) textParts.push(category);

    // Date (p)
    const date = content.querySelector('.w19-latest-news__itemDate');
    if (date) textParts.push(date);

    // Title (h3, inside link)
    const link = content.querySelector('a[href]');
    let title = null;
    if (link) {
      title = link.querySelector('h3');
      if (title) {
        // Wrap title in link if present
        const titleLink = document.createElement('a');
        titleLink.href = link.getAttribute('href');
        titleLink.title = link.getAttribute('title') || '';
        titleLink.appendChild(title);
        textParts.push(titleLink);
      }
    }

    // Description (p)
    const desc = content.querySelector('.w19-latest-news__itemDescription');
    if (desc) textParts.push(desc);

    // Compose row: [image, text]
    rows.push([
      picture,
      textParts
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
