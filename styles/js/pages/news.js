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
    charadex.page.news, 
    (arr) => {

      let pageUrl = charadex.url.getPageUrl(charadex.page.news.sitePage);
      for (let news of arr) {

        // Make the tags pretty and actually work <3
        news.tags = news.tags ? news.tags.split(',') : [];
        let fancyTagArr = [];
        if (news.tags.length >= 1) {
          for (let tag of news.tags) {
            fancyTagArr.push(`<a href="${charadex.url.addUrlParameters(pageUrl, {tags: tag.trim()})}">#${tag.trim()}</a>`);
          }
        }
        news.fancytags = fancyTagArr.join(' ');

      }
  });

  charadex.tools.loadPage('.softload', 100);
});