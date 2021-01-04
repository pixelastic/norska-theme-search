const lazyload = require('norska/frontend/lazyload');
const algolia = require('norska/frontend/algolia');
const {
  configure,
  hits,
  refinementList,
  searchBox,
} = require('norska/frontend/algolia/widgets');
const algoliaCredentials = window.CONFIG.algolia;

const widgets = [
  /**
   * Main configuration
   **/
  {
    type: configure,
    options: {
      hitsPerPage: 24,
    },
  },
  /**
   * Searchbar
   **/
  {
    type: searchBox,
    options: {
      container: '#searchbox',
      placeholder: 'Type any keyword...',
      autofocus: true,
      showReset: false,
      showSubmit: false,
      showLoadingIndicator: false,
    },
  },
  /**
   * Hits
   **/
  {
    type: hits,
    options: {
      container: '#hits',
      templates: {
        item: document.getElementById('hitTemplate').value,
        empty: document.getElementById('emptyTemplate').value,
      },
    },
  },
  // {
  //   type: pagination,
  //   options: {
  //     container: '#pagination',
  //   },
  // },
  /**
   * Sidebar filtering
   **/
  {
    type: refinementList,
    options: {
      container: '#filterBook',
      attribute: 'book',
      sortBy: ['name:asc'],
    },
  },
];

module.exports = {
  async init() {
    algolia
      .init(algoliaCredentials)
      .setWidgets(widgets)
      // .setTransforms(transforms)
      // .onDisplay(hit => {
      //   console.info(hit.picture);
      // })
      .start();

    lazyload.init();
  },
};
