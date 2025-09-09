/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the banner image (picture or img)
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    // Use <img> inside <picture>
    imageEl = picture.querySelector('img');
  }
  // Defensive fallback: look for any img
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }

  // Defensive: Find the heading/title
  let titleEl = null;
  const textContainer = element.querySelector('.w1-banner__text');
  if (textContainer) {
    titleEl = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
  }
  if (!titleEl) {
    // Fallback: any heading in the block
    titleEl = element.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // Table header row
  const headerRow = ['Hero (hero25)'];

  // Row 2: Image (background visual)
  const imageRow = [imageEl ? imageEl : ''];

  // Row 3: Title (headline)
  const contentRow = [titleEl ? titleEl : ''];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
