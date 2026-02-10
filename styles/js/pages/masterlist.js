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

        // Inventory
        let profile = listData.profileArray[0];
        let inventoryData = await charadex.manageData.readInventoryLog(profile.characterlog);

        charadex.initialize.groupGallery(
          charadex.page.masterlist.characterConfig,
          inventoryData,
          'type',
          charadex.url.getPageUrl('items')
        );
        console.log('Initialized inventory gallery!');

        // Create the log dex
        if (charadex.tools.checkArray(listData.profileArray[0].masterlistlog)) {
          let logs = await charadex.initialize.page(
            listData.profileArray[0].masterlistlog,
            charadex.page.masterlist.relatedData['masterlist log']
          );
        }

      }

    }
  );
  
  charadex.tools.loadPage('.softload', 100);
  
});