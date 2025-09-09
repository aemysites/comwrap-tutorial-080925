/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main paragraphs container
  const paragraphs = element.querySelector('.w15-paragraphs');
  if (!paragraphs) return;

  // Get the left/title column (the heading)
  const richTitle = paragraphs.querySelector('.w15-paragraphs__richTitle');
  let leftContent = null;
  if (richTitle) {
    leftContent = richTitle;
  }

  // Get the right/text column (the contacts)
  const richDescription = paragraphs.querySelector('.w15-paragraphs__richDescription');
  let rightContent = null;
  if (richDescription) {
    rightContent = richDescription;
  }

  // Build the table rows
  const headerRow = ['Columns (columns7)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
