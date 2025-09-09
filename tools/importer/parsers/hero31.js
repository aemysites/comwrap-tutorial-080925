/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the banner image (picture or img)
  let imageEl = null;
  const banner = element.querySelector('.w1-banner');
  if (banner) {
    imageEl = banner.querySelector('picture') || banner.querySelector('img');
  }

  // Defensive: Find the banner text container
  let textContent = [];
  if (banner) {
    const textContainer = banner.querySelector('.w1-banner__text');
    if (textContainer) {
      // Find heading (h1)
      const heading = textContainer.querySelector('h1');
      if (heading) {
        textContent.push(heading);
      }
      // Optionally, add subheading or CTA if present (not in this HTML)
      // Example: const subheading = textContainer.querySelector('h2, h3, p');
      // if (subheading) textContent.push(subheading);
    }
  }

  // Table rows
  const headerRow = ['Hero (hero31)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [textContent.length ? textContent : ''];

  // Create block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
