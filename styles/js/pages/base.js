/* ==================================================================== */
/* Import Utilities
======================================================================= */
import { charadex } from '../utilities.js';

/* ==================================================================== */
/* Load
======================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log('======== Running base.js script ========');
  console.log('loading included files...');
  charadex.tools.loadIncludedFiles();
  console.log('✅');

  console.log('updating meta...')
  charadex.tools.updateMeta();
  console.log('✅');
});