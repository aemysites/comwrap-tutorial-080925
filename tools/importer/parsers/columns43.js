/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main wrapper for the columns
  const paragraphs = element.querySelector('.w15-paragraphs');
  if (!paragraphs) return;

  // Left column: description/title, hr, image
  const imgDesc = paragraphs.querySelector('.w15-paragraphs__imgDescription');
  let leftColContent = [];
  if (imgDesc) {
    // Title
    const desc = imgDesc.querySelector('.w15-paragraphs__description');
    if (desc) leftColContent.push(desc);
    // Image
    const image = imgDesc.querySelector('.w15-paragraphs__image');
    if (image) leftColContent.push(image);
  }

  // Right column: all text paragraphs
  const textWrap = paragraphs.querySelector('.w15-paragraphs__text');
  let rightColContent = [];
  if (textWrap) {
    // This contains a single .w15-paragraphs_single, which contains the richtext
    const single = textWrap.querySelector('.w15-paragraphs_single');
    if (single) rightColContent.push(single);
  }

  // Build the table rows
  const headerRow = ['Columns (columns43)'];
  const contentRow = [leftColContent, rightColContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
