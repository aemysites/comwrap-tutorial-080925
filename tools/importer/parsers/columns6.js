/* global WebImporter */
export default function parse(element, { document }) {
  // Only process sections containing .w6-identity
  const identity = element.querySelector('.w6-identity');
  if (!identity) return;

  // Left column: description (title, subtitle, hr) + image
  const leftCol = [];
  const imgDesc = identity.querySelector('.w6-identity__imgDescription');
  if (imgDesc) {
    const description = imgDesc.querySelector('.w6-identity__description');
    if (description) leftCol.push(description);
    const image = imgDesc.querySelector('.w6-identity__image');
    if (image) leftCol.push(image);
  }

  // Right column: main text
  const rightCol = [];
  const textBlock = identity.querySelector('.w6-identity__text');
  if (textBlock) rightCol.push(textBlock);

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns6)'];
  const contentRow = [leftCol, rightCol];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the section with the new table
  element.replaceWith(table);
}
