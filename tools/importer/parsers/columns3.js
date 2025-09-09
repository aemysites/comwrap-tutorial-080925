/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content container (section)
  const section = element;
  // Find the inner block (w5-text-image)
  const block = section.querySelector('.w5-text-image');
  if (!block) return;

  // Find the description and image containers
  const desc = block.querySelector('.w5-text-image__description');
  const pic = block.querySelector('.w5-text-image__picture');

  // Defensive: ensure both columns exist
  if (!desc || !pic) return;

  // Table header row
  const headerRow = ['Columns (columns3)'];

  // Second row: columns
  // The visual layout is: [image | description] for reverse, [description | image] for normal
  // The block may have class 'w5-text-image--reverse' for image left, text right
  const isReverse = block.classList.contains('w5-text-image--reverse');
  let columns;
  if (isReverse) {
    columns = [pic, desc];
  } else {
    columns = [desc, pic];
  }

  // Build the table
  const cells = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  section.replaceWith(table);
}
