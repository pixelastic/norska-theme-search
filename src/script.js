const lazyload = require('norska/frontend/lazyload');
const algolia = require('norska/frontend/algolia');
const algoliaWidgets = require('norska/frontend/algolia/widgets');
const themeConfig = require('./_scripts/themeConfig.js');
const containerId = require('./_scripts/containerId.js');
const showMoreText = require('./_scripts/showMoreText.js');
const { map, merge, has } = require('lodash-es');

module.exports = {
  async init(options = {}) {
    // Merging default, theme and runtime options and sharing them
    themeConfig.options = {
      ...themeConfig.options,
      ...window.CONFIG,
      ...options,
    };

    const {
      credentials,
      placeholder,
      searchParameters,
      transforms,
      widgets,
      sidebar,
    } = themeConfig.options;

    const defaultWidgets = [
      /**
       * Main configuration
       **/
      {
        type: algoliaWidgets.configure,
        options: {
          hitsPerPage: 24,
          ...searchParameters,
        },
      },
      /**
       * Searchbar
       **/
      {
        type: algoliaWidgets.searchBox,
        options: {
          container: '#searchbox',
          placeholder,
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
        type: algoliaWidgets.hits,
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
    ];

    // Convert _data/theme.js .sidebar entry into widgets
    const sidebarWidgets = map(sidebar, (sidebarEntry) => {
      const sidebarOptions = {
        ...sidebarEntry.options,
        container: `#${containerId(sidebarEntry)}`,
      };
      const type = sidebarEntry.type || 'refinementList';
      return {
        type: algoliaWidgets[type],
        options: sidebarOptions,
      };
    });

    // Add default showMore text
    const allWidgets = map(
      [...defaultWidgets, ...sidebarWidgets, ...widgets],
      (widget) => {
        if (!has(widget, 'options.showMore')) {
          return widget;
        }

        return merge({}, widget, {
          options: { templates: { showMoreText } },
        });
      }
    );

    algolia
      .init(credentials)
      .setWidgets(allWidgets)
      .setTransforms(transforms)
      // .onDisplay(hit => {
      //   console.info(hit.picture);
      // })
      .start();

    lazyload.init();
  },
};
