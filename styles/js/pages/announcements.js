/* ==================================================================== */
/* Import Charadex
======================================================================= */
import { charadex } from '../charadex.js';


/* ==================================================================== */
/* Load
======================================================================= */
document.addEventListener("DOMContentLoaded", async () => {
  let dex = await charadex.initialize.page(
    null, 
    charadex.page.announcements, 
    (arr) => {

      let pageUrl = charadex.url.getPageUrl(charadex.page.announcements.sitePage);
      for (let announcements of arr) {

        // Make the tags pretty and actually work <3
        announcements.tags = announcements.tags ? announcements.tags.split(',') : [];
        let fancyTagArr = [];
        if (announcements.tags.length >= 1) {
          for (let tag of announcements.tags) {
            fancyTagArr.push(`<a href="${charadex.url.addUrlParameters(pageUrl, {tags: tag.trim()})}">#${tag.trim()}</a>`);
          }
        }
        announcements.fancytags = fancyTagArr.join(' ');

      }
  });

  charadex.tools.loadPage('.softload', 100);
});