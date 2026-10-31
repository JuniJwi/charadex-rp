/* ==================================================================== */
/* Charadex
======================================================================= */
let charadex = {};

/* --------------------------------------------------------------- */
/* Site Config
/* --------------------------------------------------------------- */
/* If you don't want to hard code your site information, you
/* can fill this out instead
/* Any preview links will still show Charadex's information
/* --------------------------------------------------------------- */
charadex.site = {
  title: 'Charadex: RP',
  url: 'https://junijwi.github.io/charadex-rp/',
  description: `Charadex: RP is a roleplay group site base that tracks character profiles, currencies, inventories, prompts, and lore!`
}

/* --------------------------------------------------------------- */
/* Sheet Config
/* --------------------------------------------------------------- */
/* Your sheet configuration
/* --------------------------------------------------------------- */
charadex.sheet = {

  // you can have these on the same google doc (just use the same id)
  // but you can also split them up for laod time and sanity
  id: '1VHPmKI2mkyQCg2HPe4zXzK8YmhvGRcIrXf0qXoiwRUo',
  activityid: '1LvIIvAVdC6i-HHe35ukdlBd5dDdwqwwquaFA6jKuZOU',
  contentid: '1VHPmKI2mkyQCg2HPe4zXzK8YmhvGRcIrXf0qXoiwRUo',


  pages: { // these should match your sheet names, but in lowercase
    // id pages
    masterlist:      'characters',
    masterlistLog:   'character log',
    
    player:          'players',
    inventoryLog:    'inventory log',

    items:           'items',
    skills:          'skills',          // @todo: preset powers

    // activityid pages
    announcements:   'announcements',   // @todo: make this RSS feed?
    prompts:         'prompts',
    calendar:        'calendar',        // @todo: a calendar
    events:          'events',          // @todo: user roleplay

    // contentid pages
    lore:            'lore',
    chapters:        'chapters',        // @todo: visual novel
  },

  options: { // available options for values in your sheets used in search filters
    roles: ['Story Character', 'Player Character', 'Side Character'],
    statuses: ['Active', 'Out of Date', 'Retired', 'Dead', 'WIP'],
    affiliation: ['All', 'One', 'Two', 'Three', 'Four', 'Five'],
    category: ['All', 'One', 'Two', 'Three', 'Four', 'Five'],
    itemTypes: ['All', 'Currency', 'Voucher', 'Achievement', 'Gatcha', 'Misc'],
    skillTypes: ['All', 'Passive', 'Utility', 'Active'],
    announcementTypes: ['All', 'General', 'Event', 'Update', 'Plot', 'PSA'],
    PromptTypes: ['All', 'Roleplay', 'Writing', 'Illustration', 'Question', 'Meme'],
    CalendarTypes: ['All', 'Roleplay', 'Event', 'Hiatus', 'Prompt', 'Deadline', 'Holiday', 'Plot', 'Phase'],
    
    emotions: ['Neutral', 'Happy', 'Manic', 'Angry', 'Sad', 'Nervous', 'Stressed', 'Embarrassed', 'Skeptical', 'Signature'],

  }

}

/* ==================================================================== */
/* Page configuration
/* ==================================================================== */
/* Some general notes for each section...
/*
/* sheetID:         which sheet we're pulling the information from
/* sheetPage:       refers to the name of the google sheet, but in lowercase
/* sitePage:        refers to the URL path of the page. Usually, this will
/*                  match the name of the html file for that page
/* dexSelector:     refers to the class prefix of the html elements for
/*                  javascript selection. is 'charadex' by default.
/* profileProperty: column on the sheet that serves as the UNIQUE id key
/*                  used to identify the row and create the URL.
/*
/* sort:
/*  toggle:         true/false to turn sort on or off
/*  sortProperty:   the column used to 'sort' the items. Can use id's,
/*                  a manual sort, names, etc.
/*  order:          'asc' or 'desc'
/*  parameters:     Sorting by specific columns as an option.
/*
/* pagination:
/*  toggle:         true/false to turn pagination on or off
/*  bottomToggle:   whether to have pagination at the bottom in
/*                  addition to the top.
/*  amount:         how many items per page
/*
/* filters:         these are search filters! they filter on user select.
/*  toggle:         true/false to turn filters on or off
/*  parameters:     what a user can filter by, use options defined above.
/*
/* fauxFolder:      these create an array of buttons that filter on click.
/*  toggle:         true/false to turn filters on or off
/*  folderProperty: Name of the folder
/*  parameters:     what a user can filter by, use options defined above.
/*
/* search:          this filters on user input.
/*  toggle:         true/false to turn search on or off
/*  filterToggle:   true/false to expand or collapse filter by default.
/*  parameters:     what a user can filter by, should be column names.
/*
/* prevnex:         whether or not to show the names of previous and next
/*                  entries at the top.
/*  toggle:         true/false to turn prevnext on or off
/*
/* fillBlanks:      columns in which you want to replace any blank
/*                  values with a formatted "--"
/*
/* markdownColumns: columns in which you want to convert markdown text
/*
/* badgeColumns:    columns in which you want values to be turned into badges.
/*                  it will create a '___badge' class of these columns.
/*                  each item should be a dictionary where the name of the
/*                  dict is the column name, and each entry is a key/value
/*                  pair of the column value / column html style class.
/*
/* ==================================================================== */
charadex.page = {};


/* --------------------------------------------------------------- */
/* characters.html
/* --------------------------------------------------------------- */
charadex.page.masterlist = {

  sheetID: charadex.sheet.id,
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
      'Affiliation': charadex.sheet.options.affiliation,
      'Category': charadex.sheet.options.category,
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
    'personality',
    'lore',
  ],
  
  badgeColumns: {
    affiliation: {
      one: 'bg-one',
      two: 'bg-two',
      three: 'bg-three',
      four: 'bg-four',
      five: 'bg-five',
    },
    pronouns: {
      hehim: 'bg-hehim',
      sheher: 'bg-sheher',
      theythem: 'bg-theythem',
      itits: 'bg-itits',
      other: 'bg-other',
    }
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

/* --------------------------------------------------------------- */
/* players.html
/* --------------------------------------------------------------- */
charadex.page.player = {

  sheetID: charadex.sheet.id,
  sheetPage: charadex.sheet.pages.player,
  sitePage: 'players',
  dexSelector: 'player',
  profileProperty: 'username',

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

  fillBlanks: [],

  markdownColumns: [
    'description',
  ],

  badgeColumns: {
    role: { 
      creator: 'bg-primary',
      mod: 'bg-primary',
      player: 'bg-secondary',
    },
    pronouns: {
      hehim: 'bg-hehim',
      sheher: 'bg-sheher',
      theythem: 'bg-theythem',
      itits: 'bg-itits',
      other: 'bg-other',
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


/* --------------------------------------------------------------- */
/* items.html
/* --------------------------------------------------------------- */
charadex.page.items = {

  sheetID: charadex.sheet.id,
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

  fillBlanks: [],
  
  markdownColumns: [],

  badgeColumns: {},

};


/* --------------------------------------------------------------- */
/* skills.html
/* --------------------------------------------------------------- */
charadex.page.skills = {

  sheetID: charadex.sheet.id,
  sheetPage: charadex.sheet.pages.skills,
  sitePage: 'skills',
  dexSelector: 'skill',
  profileProperty: 'skill',

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
      'Type': charadex.sheet.options.skillTypes,
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Type',
    parameters: charadex.sheet.options.skillTypes,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Skill', 'Description']
  },

  prevNext: {
    toggle: true,
  },

  fillBlanks: [],
  
  markdownColumns: [],

  badgeColumns: {},

};


/* --------------------------------------------------------------- */
/* Announcements.html
/* --------------------------------------------------------------- */
charadex.page.announcements = {

  sheetID: charadex.sheet.activityid,
  sheetPage: charadex.sheet.pages.announcements,
  sitePage: 'announcements',
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
    parameters: ['All', 'Title', 'Author', 'Content', 'Tags']
  },

  prevNext: {
    toggle: false,
  },
  
  fillBlanks: [
    'title',
    'author',
    'summary',
    'content',
  ],

  markdownColumns: [
    'summary',
    'content',
  ],

  badgeColumns: {},

}


/* --------------------------------------------------------------- */
/* prompts.html
/* --------------------------------------------------------------- */
charadex.page.prompts = {

  sheetID: charadex.sheet.activityid,
  sheetPage: charadex.sheet.pages.prompts,
  sitePage: 'prompts',
  dexSelector: 'prompt',
  profileProperty: 'title',

  sort: {
    toggle: true,
    sortProperty: 'end',
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
      'Affiliation': charadex.sheet.options.affiliation,
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
    'start',
    'end',
    'summary',
    'description',
  ],
  
  markdownColumns: [
    'summary',
    'description',
  ],

  badgeColumns: {
    affiliation: {               // name of the column
      one: 'bg-one',      // value: 'style'
      two: 'bg-two',      // value: 'style'
      three: 'bg-three',  // value: 'style'
      four: 'bg-four',     // value: 'style'
      five: 'bg-five',      // value: 'style'
    },
  },

};


/* --------------------------------------------------------------- */
/* calendar.html
/* --------------------------------------------------------------- */
charadex.page.calendar = {

  sheetID: charadex.sheet.activityid,
  sheetPage: charadex.sheet.pages.calendar,
  sitePage: 'calendar',
  dexSelector: 'calendar',
  profileProperty: 'id',

  sort: {
    toggle: true,
    sortProperty: 'start',
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
      'Affiliation': charadex.sheet.options.affiliation,
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
    'start',
    'end',
    'summary',
    'description',
  ],
  
  markdownColumns: [
    'summary',
    'description',
  ],

  badgeColumns: {
    affiliation: {               // name of the column
      one: 'bg-one',      // value: 'style'
      two: 'bg-two',      // value: 'style'
      three: 'bg-three',  // value: 'style'
      four: 'bg-four',     // value: 'style'
      five: 'bg-five',      // value: 'style'
    },
  },

};


/* --------------------------------------------------------------- */
/* events.html
/* --------------------------------------------------------------- */
charadex.page.events = {

  sheetID: charadex.sheet.activityid,
  sheetPage: charadex.sheet.pages.events,
  sitePage: 'events',
  dexSelector: 'event',
  profileProperty: 'id',

  sort: {
    toggle: true,
    sortProperty: 'start',
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
      'Affiliation': charadex.sheet.options.affiliation,
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
    'start',
    'end',
    'summary',
    'description',
  ],
  
  markdownColumns: [
    'summary',
    'description',
  ],

  badgeColumns: {
    affiliation: {               // name of the column
      one: 'bg-one',      // value: 'style'
      two: 'bg-two',      // value: 'style'
      three: 'bg-three',  // value: 'style'
      four: 'bg-four',     // value: 'style'
      five: 'bg-five',      // value: 'style'
    },
  },

};


/* --------------------------------------------------------------- */
/* lore.html
/* --------------------------------------------------------------- */
charadex.page.lore = {

  sheetID: charadex.sheet.contentid,
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

  badgeColumns: {},

}



/* --------------------------------------------------------------- */
/* chapters.html
/* --------------------------------------------------------------- */
charadex.page.chapters = {

  // Dex Set Up
  sheetID: charadex.sheet.contentid,
  sheetPage: charadex.sheet.pages.chapters,
  sitePage: 'chapters',
  dexSelector: 'charadex',
  profileProperty: 'name',

  // Dex Options
  sort: {
    toggle: false,
    sortProperty: 'name',
    order: 'asc',
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 24,
  },

  filters: {
    toggle: true,
    parameters: {
      'Affiliation': charadex.sheet.options.affiliation,
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
    parameters: ['Name', 'Characters']
  },

  prevNext: {
    toggle: true,
  },

  fillBlanks: [
    'summary',
  ],

  markdownColumns: [
    'summary',
  ],

  badgeColumns: {},

};


/* --------------------------------------------------------------- */
/* index.html
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