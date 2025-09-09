/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero image (picture or img)
  let imageEl = null;
  const imageContainer = element.querySelector('.w14-hero__image');
  if (imageContainer) {
    imageEl = imageContainer.querySelector('picture') || imageContainer.querySelector('img');
  }

  // Defensive: Find the text container
  const textContainer = element.querySelector('.w14-hero__text');
  let richText = null;
  let cta = null;
  if (textContainer) {
    richText = textContainer.querySelector('.w14-hero__richtext');
    cta = textContainer.querySelector('.w14-hero__cta');
  }

  // Compose the table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imageEl ? imageEl : ''];
  // Compose the content row: title, subheading, CTA
  const contentItems = [];
  if (richText) contentItems.push(richText);
  if (cta) contentItems.push(cta);
  const contentRow = [contentItems];

  // Build the table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
