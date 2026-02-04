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
    charadex.page.masterlist,
    null,
    async (listData) => {

      console.log("LIST DATA:", listData); 
      if (listData.type == 'profile') {
        
        $('#main-container').css('height','auto');
        $('#anchor-nav').show();

        let profile = listData.profileArray[0];

        // Logs
        if (charadex.tools.checkArray(profile.characterlog)) {
          let logs = await charadex.initialize.page(
            profile.characterlog,
            charadex.page.masterlist.relatedData['character log']
          );
          console.log('Initialized related logs!');
        }

        // Set the player url
        let pageUrl = charadex.url.getPageUrl(charadex.page.player.sitePage);
        $('.playerlink').attr('href', charadex.url.addUrlParameters(pageUrl, { profile: profile.player }));

        // Set partner url
        if (profile.partner) {
          $('.partnerlink').attr('href', charadex.url.addUrlParameters(
            charadex.url.getPageUrl(charadex.page.masterlist.sitePage),
            { profile: profile.partner }));
        }

        // Oh lordt, it's rels time =========================================
        if (profile.relationships && typeof profile.relationships === 'string') {

          // our rels column has a textjoin of all relationships
          // we need to put it back into array form
          let relSplit = profile.relationships.split(';;;');
          
          const numCols = 5;
          let relElement = '';

          for (let i = 0; i < relSplit.length; i += numCols) {
            let rel = relSplit.slice(i, i + numCols);

            if (rel[1] === 'FALSE') { // hiding = FALSE
              // Set the character link
              let charLink = charadex.url.addUrlParameters(
                charadex.url.getPageUrl(charadex.page.masterlist.sitePage),
                { profile: charadex.tools.scrub(rel[0]) });
              let relTitle = rel[3] ? rel[3] : '--';
              let relText = rel[4] ? charadex.manageData.convertMarkdown(rel[4]) : `<span class="text-muted">--</span>`;
              // Create the DOM elements
              relElement += `<div class="row no-gutters justify-content-center align-items-center mb-2">
                              <div class="col-md-3 text-center text-uppercase">
                                <h3><a href="${charLink}">${rel[0]}</a></h3>
                                <p class="small"><span class="script">Last Updated:</span> ${rel[2]}</p>
                              </div>
                              <div class="col-md-9 p-2 text-center">
                                <p class="script">${relTitle}</p>
                                <div>${relText}</div>
                              </div>
                             </div>`
            }
          }
          $('#rel-container').html(relElement);
        }
      }
  });

  // open collapsed items when clicking on the corresponding link
  var hash = $(location).attr('hash');
  if (hash) {
    var $hash = $(hash);
    var $parents = $hash.parents('.collapse');
    $parents.collapse('show');

    window.location = hash;
  }

  charadex.tools.loadPage('.softload', 100);
});