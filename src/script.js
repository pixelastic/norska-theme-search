const lazyload = require('norska/frontend/lazyload');
const algolia = require('norska/frontend/algolia');
const {
  configure,
  searchBox,
  hits,
  refinementList,
} = require('norska/frontend/algolia/widgets');
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
    } = themeConfig.options;

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
    ];

    // Enhance widgets with some default values
    const allWidgets = map([...defaultWidgets, ...widgets], (widget) => {
      // Add custom showMore button
      if (has(widget, 'options.showMore')) {
        merge(widget, { options: { templates: { showMoreText } } });
      }

      // Add default container
      if (!has(widget, 'container') && has(widget, 'options.attribute')) {
        merge(widget, { options: { container: `#${containerId(widget)}` } });
      }

      // Add default type
      if (!has(widget, 'type')) {
        widget.type = refinementList;
      }

      return widget;
    });

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
