/* ==================================================================== */
/* Charadex
=======================================================================  /

  The charadex namespace. You can use it if you like, but this should
  prevent charadex from messing with any other imported code.
    
======================================================================= */
let charadex = {};

/* ==================================================================== */
/* Site
/* If you don't want to hard code your site information, you
/* can fill this out instead
/* Any preview links will still show Charadex's information
/* ==================================================================== */
charadex.site = {
  title: 'Charadex: RP',
  url: 'https://junijwi.github.io/charadex-rp/',
  description: `Charadex: RP is a roleplay group site base that tracks character profiles, currencies, inventories, prompts, and lore!`
}

/* ==================================================================== */
/* Sheet Config
/* Your sheet configuration
/* ==================================================================== */
charadex.sheet = {

  id: '1VHPmKI2mkyQCg2HPe4zXzK8YmhvGRcIrXf0qXoiwRUo',

  pages: {
    masterlist:    'characters',
    masterlistLog: 'character log',
    player:        'players',
    inventoryLog:  'inventory log',
    items:         'items',
    prompts:       'prompts',
    lore:          'lore',
  },

  options: {

    roles: ['Story Character', 'Player Character', 'Side Character'],
    statuses: ['Active', 'Out of Date', 'Retired', 'Dead', 'WIP'],
    category: ['All', 'One', 'Two', 'Three', 'Four', 'Five'],
    subcategory: ['All', 'One', 'Two', 'Three', 'Four', 'Five'],
    itemTypes: ['All', 'Currency', 'Voucher', 'Achievement', 'Gatcha', 'Misc'],

  }

}


/* ==================================================================== */
/* Page configuration
/* ==================================================================== */
charadex.page = {};


/* Item Catalogue
/* --------------------------------------------------------------- */
charadex.page.items = {

  sheetPage: charadex.sheet.pages.items,
  sitePage: 'items',
  dexSelector: 'item',
  profileProperty: 'item',

  sort: {
    toggle: true,
    sortProperty: 'sort',
    order: 'asc',
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 24,
  },

  filters: {
    toggle: false,
    parameters: {
      'Type': charadex.sheet.options.itemTypes,
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Type',
    parameters: charadex.sheet.options.itemTypes,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Item', 'Description']
  },

  prevNext: {
    toggle: true,
  },

};


/* Prompts
/* --------------------------------------------------------------- */
charadex.page.prompts = {

  sheetPage: charadex.sheet.pages.prompts,
  sitePage: 'prompts',
  dexSelector: 'prompt',
  profileProperty: 'title',

  sort: {
    toggle: true,
    sortProperty: 'enddate',
    order: 'asc',
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: true,
    parameters: {
      'Category': charadex.sheet.options.category,
    }
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: false,
    parameters: ['Title']
  },

  prevNext: {
    toggle: true,
  },
  
  fillBlanks: [
    'title',
    'startdate',
    'enddate',
    'summary',
    'description',
  ],
  
  markdownColumns: [
    'summary',
    'description',
  ],

  badgeColumns: {
    category: {               // name of the column
      one: 'bg-one',      // value: 'style'
      two: 'bg-two',      // value: 'style'
      three: 'bg-three',  // value: 'style'
      four: 'bg-four',     // value: 'style'
      five: 'bg-five',      // value: 'style'
    },
  },

};


/* Lore
/* --------------------------------------------------------------- */
charadex.page.lore = {

  sheetPage: charadex.sheet.pages.lore,
  sitePage: 'lore',
  dexSelector: 'charadex',
  profileProperty: 'id',

  sort: {
    toggle: false,
    sortProperty: 'id',
    order: 'asc',
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: false,
    parameters: {
      'TBA': [],
    }
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Title', 'Content', 'Tags']
  },

  prevNext: {
    toggle: false,
  },
  
  fillBlanks: [
    'title',
    'summary',
    'content',
  ],

  markdownColumns: [
    'summary',
    'content',
  ],

}


/* Masterlist
/* --------------------------------------------------------------- */
charadex.page.masterlist = {

  sheetPage: charadex.sheet.pages.masterlist,
  sitePage: 'characters',
  dexSelector: 'charadex',
  profileProperty: 'name',

  sort: {
    toggle: true,
    sortProperty: 'name',
    order: 'asc',
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: true,
    parameters: {
      'Role': charadex.sheet.options.roles,
      'Status': charadex.sheet.options.statuses,
      'Category': charadex.sheet.options.category,
      'Subcategory': charadex.sheet.options.subcategory,
    }
  },

  fauxFolder: {
    toggle: false,
    folderProperty: 'Role',
    parameters: charadex.sheet.options.roles,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Name', 'Player', 'Age', 'Gender']
  },

  prevNext: {
    toggle: true,
  },

  relatedData: {

    [charadex.sheet.pages.masterlistLog]: {

      sheetPage: charadex.sheet.pages.masterlistLog,
      primaryProperty: 'name', // The key of the field we are SEARCHING BY in primary array
      relatedProperty: 'name', // The name of the field we are SEARCHING IN in secondary array
      dexSelector: 'log',
      profileProperty: 'name', // The ID of the secondary field
      profileToggle: false,

      sort: {
        toggle: true,
        sortProperty: 'timestamp',
        order: 'desc',
        parameters: []
      },

      pagination: {
        toggle: true,
        bottomToggle: true,
        amount: 12,
      },

    }

  },
  
  fillBlanks: [
    'name',
    'alias',
    'age',
    'gender',
    'pronouns',
    'sexuality',
    'birthday',
    'height',
    'build',
    'goodtraits',
    'neutraltraits',
    'badtraits',
    'personality',
    'lore',
  ],

  markdownColumns: [
    'mythosdescription',
    'abilitydescription1',
    'abilitydescription2',
    'abilitydescription3',
    'abilitydescription4',
    'abilitydescription5',
    'personality',
    'lore',
  ],
  
  badgeColumns: {
    category: {               // name of the column
      one: 'bg-one',      // value: 'style'
      two: 'bg-two',      // value: 'style'
      three: 'bg-three',  // value: 'style'
      four: 'bg-four',     // value: 'style'
      five: 'bg-five',      // value: 'style'
    },
    pronouns: {               // name of the column
      hehim: 'bg-hehim',    // value: 'style'
      sheher: 'bg-sheher',    // value: 'style'
      theythem: 'bg-theythem', // value: 'style'
      itits: 'bg-itits',    // value: 'style'
      other: 'bg-other',    // value: 'style'
    }
  },

  // This is a special config for their inventory
  characterConfig: {

    sheetPage: charadex.sheet.pages.items,
    sitePage: 'items',
    dexSelector: 'item',
    profileProperty: 'item',
    profileToggle: false,

    sort: {
      toggle: true,
      sortProperty: 'sort',
      order: 'asc',
      parametersKey: 'type', 
      parameters: [charadex.sheet.options.itemTypes]
    },

    search: {
      toggle: true,
      filterToggle: false,
      parameters: ['Item']
    },

    filters: {
      toggle: false,
      parameters: {
        'Type': charadex.sheet.options.itemTypes,
      }
    },

  }

};

/* Player & Inventory
/* --------------------------------------------------------------- */
charadex.page.player = {

  // Dex Set Up
  sheetPage: charadex.sheet.pages.player,
  sitePage: 'players',
  dexSelector: 'player',
  profileProperty: 'username',

  // Dex Options
  sort: {
    toggle: true,
    sortProperty: 'username',
    order: 'asc',
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 24,
  },

  filters: {
    toggle: false,
    parameters: {}
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['Username']
  },

  prevNext: {
    toggle: true,
  },

  markdownColumns: [
    'description',
  ],

  badgeColumns: {
    role: {                   // name of the column
      creator: 'bg-primary',  // value: 'style'
      mod: 'bg-primary',      // value: 'style'
      player: 'bg-secondary', // value: 'style'
    },
    pronouns: {               // name of the column
      hehim: 'bg-hehim',    // value: 'style'
      sheher: 'bg-sheher',    // value: 'style'
      theythem: 'bg-theythem', // value: 'style'
      itits: 'bg-itits',    // value: 'style'
      other: 'bg-other',    // value: 'style'
    }
  },


  // Related Data
  relatedData: {

    [charadex.sheet.pages.inventoryLog]: {

      sheetPage: charadex.sheet.pages.inventoryLog,
      primaryProperty: 'username', // The key of the field we are SEARCHING BY in primary array
      relatedProperty: 'username', // The name of the field we are SEARCHING IN in secondary array
      dexSelector: 'log',
      profileProperty: 'username', // The ID of the secondary field
      profileToggle: false,

      sort: {
        toggle: true,
        sortProperty: 'timestamp',
        order: 'desc',
        parameters: []
      },

      pagination: {
        toggle: true,
        bottomToggle: true,
        amount: 12,
      },

    },
    

    [charadex.sheet.pages.masterlist]: {

      // This imports the config from the masterlist
      // So you dont have to repeat yourself
      ...charadex.page.masterlist, 

      sheetPage: charadex.sheet.pages.masterlist,
      sitePage: 'characters',
      primaryProperty: 'username', // name of field of the calling page to search by
      relatedProperty: 'player',   // name of column to search in related page
      dexSelector: 'charadex',
      profileProperty: 'name',     // name of found record of the related page
      profileToggle: false,

    }

  },

  
  // This is a special config for their inventory
  playerConfig: {

    sheetPage: charadex.sheet.pages.items,
    sitePage: 'items',
    dexSelector: 'item',
    profileProperty: 'item',
    profileToggle: false,

    sort: {
      toggle: true,
      sortProperty: 'sort',
      order: 'asc',
      parametersKey: 'type', 
      parameters: [charadex.sheet.options.itemTypes]
    },

    search: {
      toggle: true,
      filterToggle: false,
      parameters: ['Item']
    },

    filters: {
      toggle: false,
      parameters: {
        'Type': charadex.sheet.options.itemTypes,
      }
    },

  }

};


/* Index
/* --------------------------------------------------------------- */
charadex.page.index = {

  prompts: {
    ... charadex.page.prompts,
    dexSelector: 'prompt',
    amount: 2,
  },

  designs: {
    ... charadex.page.masterlist,
    dexSelector: 'charadex',
    amount: 4,

    sort: {
      toggle: true,
      sortProperty: 'dateadded',
      order: 'desc',
      parameters: []
    },
  }

};


export { charadex };