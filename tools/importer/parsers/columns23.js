/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .w7-media container
  const media = element.querySelector('.w7-media');
  if (!media) return;
  // Get direct children .w7-media__box (columns)
  const boxes = Array.from(media.querySelectorAll(':scope > .w7-media__box'));
  if (!boxes.length) return;

  // For each box, extract the <picture> element (reference, not clone)
  const columns = boxes.map(box => {
    const pic = box.querySelector('picture');
    return pic || '';
  });

  // Build the table: header and content row
  const headerRow = ['Columns (columns23)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
