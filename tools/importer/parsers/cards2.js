/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image element from a <picture>
  function extractImage(picture) {
    if (!picture) return null;
    // Try to find the <img> inside the <picture>
    const img = picture.querySelector('img');
    return img || null;
  }

  // Helper to build the text cell for each card
  function buildTextCell(box) {
    const contentDiv = box.querySelector('.w11-presets__boxContent');
    if (!contentDiv) return '';
    // Title
    const title = contentDiv.querySelector('.w11-presets__boxTitle');
    // CTA
    const cta = contentDiv.querySelector('.w11-presets__boxCta');
    // Link (the card itself)
    const link = box.getAttribute('href');
    // Build the text cell content
    const fragment = document.createDocumentFragment();
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      fragment.appendChild(h3);
    }
    if (cta && link) {
      const ctaLink = document.createElement('a');
      ctaLink.href = link;
      ctaLink.textContent = cta.textContent;
      fragment.appendChild(ctaLink);
    }
    return fragment;
  }

  // Get all direct card links
  const cards = element.querySelectorAll(':scope > a.w11-presets__box');

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // Card rows
  cards.forEach((card) => {
    // Image cell
    const picture = card.querySelector('picture');
    const img = extractImage(picture);
    // Use the <picture> if present, else the <img>
    let imageCell = null;
    if (picture) {
      imageCell = picture;
    } else if (img) {
      imageCell = img;
    } else {
      imageCell = '';
    }
    // Text cell
    const textCell = buildTextCell(card);
    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
