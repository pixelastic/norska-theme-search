const {
  configure,
  hits,
  searchBox,
} = require('norska/frontend/algolia/widgets');

module.exports = [
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
];
