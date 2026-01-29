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
    charadex.page.inventory,
    null, 
    async (listData) => {

      console.log("LIST DATA:", listData); 
      if (listData.type == 'profile') {
        $('#gallery-header').hide();

        let profile = listData.profileArray[0];
        let fixedData = await charadex.manageData.inventoryFix(profile);

        // Inventory
        charadex.initialize.groupGallery(
          charadex.page.inventory.inventoryConfig,
          fixedData,
          'type',
          charadex.url.getPageUrl('items')
        );
        console.log('Initialized inventory gallery!');

        // Designs
        if (charadex.tools.checkArray(profile.characters)) {
          let designs = await charadex.initialize.page(
            profile.characters,
            charadex.page.inventory.relatedData['characters'],
          );
          console.log('Initialized related characters!');
        }

        // Logs
        if (charadex.tools.checkArray(profile.inventorylog)) {
          let logs = await charadex.initialize.page(
            profile.inventorylog,
            charadex.page.inventory.relatedData['inventory log'],
          );
          console.log('Initialized related logs!');
        }

      }
    });
    
  charadex.tools.loadPage('.softload', 500);  
});