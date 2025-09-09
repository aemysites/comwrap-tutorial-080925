/* global WebImporter */
export default function parse(element, { document }) {
  // Find the iframe (YouTube embed)
  const iframe = element.querySelector('iframe');
  let videoUrl = '';
  let videoTitle = '';
  if (iframe && iframe.src) {
    videoUrl = iframe.src;
    // Convert YouTube embed URL to canonical watch URL
    const ytMatch = videoUrl.match(/youtube\.com\/embed\/([\w-]+)/);
    if (ytMatch) {
      videoUrl = `https://www.youtube.com/watch?v=${ytMatch[1]}`;
    }
    // Try to get the title from the iframe attribute
    if (iframe.title) {
      videoTitle = iframe.title;
    }
  }

  // Create the link element for the video URL
  let linkEl = null;
  if (videoUrl) {
    linkEl = document.createElement('a');
    linkEl.href = videoUrl;
    linkEl.textContent = videoUrl;
  }

  // Add video title as text above the link if available
  let cellContent = [];
  if (videoTitle) {
    cellContent.push(document.createTextNode(videoTitle));
    cellContent.push(document.createElement('br'));
  }
  if (linkEl) {
    cellContent.push(linkEl);
  }

  // Table header row
  const headerRow = ['Embed (embedVideo20)'];
  // Table content row: video title and link
  const contentRow = [cellContent.length ? cellContent : ''];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
