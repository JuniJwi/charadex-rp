/* ==================================================================== */
/* Import Utilities
======================================================================= */
import { charadex } from '../utilities.js';

/* ==================================================================== */
/* Declare Functions
======================================================================= */
/**
 * Load other .html files via include.
 * Includes replace the entire div.
 * 
 * To use this, create the HTML file you want to import
 * Then using a div, give it a class load-html and
 * data-source of where the html file lives.
 * 
 * Example:
 * <div class="load-html" data-source="/charadex-rp/includes/header.html"></div>
 */
function loadIncludedFiles() {
  $(".load-html").each(function () {
    const target = $(this);
    $.get(this.dataset.source, function (data) {
      target.replaceWith(data);
      console.log("Loaded HTML file:", target);
    });
  });
}
/* ==================================================================== */
/* Load
======================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log('======== Running base.js script ========');
  console.log('loading included files...');
  loadIncludedFiles();
  console.log('✅');

  console.log('updating meta...')
  charadex.tools.updateMeta();
  console.log('✅');
});