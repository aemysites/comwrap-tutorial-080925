/* global WebImporter */
export default function parse(element, { document }) {
  // Only process the cooperative block
  const coopBlock = element.querySelector('.w18-cooperative');
  if (!coopBlock) return;

  // Header row: must match block name exactly
  const headerRow = ['Columns (columns30)'];

  // Top section: tag + title
  const topSection = coopBlock.querySelector('.w18-cooperative__top');
  let topSectionContent = '';
  if (topSection) {
    // Extract tag and title, preserving semantic structure
    const tag = topSection.querySelector('.w18-cooperative__tag');
    const title = topSection.querySelector('.w18-cooperative__title');
    const topDiv = document.createElement('div');
    if (tag) {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tag.textContent;
      tagSpan.style.color = tag.style.color;
      topDiv.appendChild(tagSpan);
    }
    if (title) {
      const titleEl = document.createElement('h3');
      titleEl.textContent = title.textContent;
      topDiv.appendChild(titleEl);
    }
    topSectionContent = topDiv;
  }

  // Content section
  const contentSection = coopBlock.querySelector('.w18-cooperative__content');
  if (!contentSection) return;

  // Left column: map image
  const imageContainer = contentSection.querySelector('.w18-cooperative__imageContainer');
  let leftColumnContent = '';
  if (imageContainer) {
    // Reference the actual image element
    const img = imageContainer.querySelector('img');
    if (img) {
      leftColumnContent = img;
    }
  }

  // Right column: list of cooperatives
  const itemsContainer = contentSection.querySelector('.w18-cooperative__items');
  let rightColumnContent = '';
  if (itemsContainer) {
    // Create a container div to hold all items
    const listDiv = document.createElement('div');
    listDiv.className = 'cooperative-list';
    const items = Array.from(itemsContainer.querySelectorAll('.w18-cooperative__item'));
    items.forEach(item => {
      // Reference the actual link element
      listDiv.appendChild(item);
    });
    rightColumnContent = listDiv;
  }

  // Compose the table rows
  // First row: header
  // Second row: top section (tag + title) as a single cell spanning both columns
  // Third row: columns (map image, cooperative list)
  const tableRows = [
    headerRow,
    [topSectionContent],
    [leftColumnContent, rightColumnContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
