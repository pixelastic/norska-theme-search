const lazyload = require('norska/frontend/lazyload');
const algolia = require('norska/frontend/algolia');
const {
  configure,
  hits,
  searchBox,
} = require('norska/frontend/algolia/widgets');
const themeConfig = require('./_scripts/themeConfig.js');
const algoliaCredentials = window.CONFIG.algolia;

module.exports = {
  async init(options = {}) {
    themeConfig.options = { ...themeConfig.options, ...options };

    const { widgets, transforms, searchParameters } = themeConfig.options;

    const defaultWidgets = [
      /**
       * Main configuration
       **/
      {
        type: configure,
        options: {
          hitsPerPage: 24,
          ...searchParameters,
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
      // {
      //   type: refinementList,
      //   options: {
      //     container: '#filterBook',
      //     attribute: 'book',
      //     sortBy: ['name:asc'],
      //   },
      // },
    ];

    algolia
      .init(algoliaCredentials)
      .setWidgets([...defaultWidgets, ...widgets])
      .setTransforms(transforms)
      // .onDisplay(hit => {
      //   console.info(hit.picture);
      // })
      .start();

    lazyload.init();
  },
};
