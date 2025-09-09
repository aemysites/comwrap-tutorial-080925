/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards container
  const cardsContainer = element.querySelector('.w2-cards__container');
  if (!cardsContainer) return;

  // Header row for the block table
  const headerRow = ['Cards (cards9)'];
  const rows = [headerRow];

  // Find the carousel container with all card slides
  const carouselTrack = cardsContainer.querySelector('.w2-cards__track');
  if (!carouselTrack) return;

  // Get all card slides (each is an <a> with image and text)
  const cardSlides = Array.from(carouselTrack.querySelectorAll('.w2-cards__slide'));

  cardSlides.forEach((slide) => {
    // --- IMAGE CELL ---
    // Find the <picture> element (contains the image)
    const picture = slide.querySelector('picture');
    let imageCell = picture ? picture.cloneNode(true) : '';

    // --- TEXT CELL ---
    // Find the card title (h2)
    const title = slide.querySelector('.w2-cards__slideTitle');
    // Find the description ("Approfondisci" span)
    const desc = slide.querySelector('.w2-cards__slideSeeMore');
    // Find the CTA (the slide itself is a link)
    let cta = null;
    if (slide.href) {
      cta = document.createElement('a');
      cta.href = slide.href;
      cta.textContent = desc ? desc.textContent : 'Scopri di più';
      cta.title = slide.title || '';
    }

    // Compose the text cell: title, CTA
    const textCellContent = [];
    if (title) textCellContent.push(title.cloneNode(true));
    if (cta) textCellContent.push(cta);

    rows.push([imageCell, textCellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
