/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build the text cell for each slide
  function buildTextCell(slide) {
    const frag = document.createDocumentFragment();
    // Tag (subtitle)
    const tag = slide.querySelector('.w3-carousel__oSlideTag');
    if (tag) {
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tag.cloneNode(true));
      frag.appendChild(tagDiv);
    }
    // Title (as heading)
    const title = slide.querySelector('.w3-carousel__oSlideTitle');
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent;
      frag.appendChild(h2);
    }
    // CTA link
    const link = slide.querySelector('.w3-carousel__oSlideLink');
    if (link) {
      // Place CTA at the bottom, separated by a div
      const ctaDiv = document.createElement('div');
      ctaDiv.appendChild(link.cloneNode(true));
      frag.appendChild(ctaDiv);
    }
    return frag;
  }

  // Hardcoded image URLs for each slide (order matches slide order)
  const imageUrls = [
    'https://main--comwrap-tutorial-080925--aemysites.aem.page/media_1db28012efa31eab10e70311da3a8120431c01555.jpg',
    'https://main--comwrap-tutorial-080925--aemysites.aem.page/media_15b39a9fa432cbfe85634c16a40093b665a539fe0.jpg',
    'https://main--comwrap-tutorial-080925--aemysites.aem.page/media_16b48248c48da032ddbf47d6e12ceb370c3297182.jpg',
    'https://main--comwrap-tutorial-080925--aemysites.aem.page/media_12e9a95cbea853e7d4d3801625e81d509936dbc9c.jpg'
  ];

  // Get all slides
  const slides = element.querySelectorAll(':scope > .w3-carousel__oSlide');
  const rows = [];
  // Header row
  rows.push(['Carousel (carousel33)']);

  slides.forEach((slide, idx) => {
    // Use hardcoded image for first cell
    const img = document.createElement('img');
    img.src = imageUrls[idx] || '';
    img.setAttribute('width', '750');
    img.setAttribute('height', '584');
    const imgCell = img;
    // Build text cell
    const textCell = buildTextCell(slide);
    rows.push([imgCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
