/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main identity block
  const identity = element.querySelector('.w6-identity');
  if (!identity) return;

  // Get the left column: description (title + image), but exclude <hr>
  const imgDesc = identity.querySelector('.w6-identity__imgDescription');
  let leftColContent = [];
  if (imgDesc) {
    // Description (title + hr)
    const desc = imgDesc.querySelector('.w6-identity__description');
    if (desc) {
      // Clone and remove <hr>
      const descClone = desc.cloneNode(true);
      descClone.querySelectorAll('hr').forEach(hr => hr.remove());
      leftColContent.push(descClone);
    }
    // Image
    const image = imgDesc.querySelector('.w6-identity__image');
    if (image) leftColContent.push(image);
  }

  // Get the right column: main text
  const textCol = identity.querySelector('.w6-identity__text');
  let rightColContent = [];
  if (textCol) rightColContent.push(textCol);

  // Build the table rows
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftColContent, rightColContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
