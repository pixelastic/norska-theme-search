const lazyload = require('norska/frontend/lazyload');
const algolia = require('norska/frontend/algolia');
const algoliaWidgets = require('norska/frontend/algolia/widgets');
const themeConfig = require('./_scripts/themeConfig.js');
const containerId = require('./_scripts/containerId.js');
const showMoreText = require('./_scripts/showMoreText.js');
const initialUiStateKey = require('./_scripts/initialUiStateKey');
const { map, merge, has, isString } = require('lodash-es');

module.exports = {
  async init(runtimeOptions = {}) {
    // Merging theme and runtime options and sharing them
    themeConfig.options = {
      ...themeConfig.options,
      ...runtimeOptions,
    };

    const {
      credentials,
      placeholder,
      hitName,
      searchParameters,
      transforms,
      widgets,
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
      {
        type: algoliaWidgets.stats,
        options: {
          container: '#stats',
          templates: {
            text(statOptions) {
              const { hostname, pathname } = window.location;
              const utmContent = `${hostname}${pathname}`;
              const poweredByUrl = `https://www.algolia.com/?utm_source=instantsearch.js&utm_medium=website&utm_content=${utmContent}&utm_campaign=poweredby`;
              const suffix = `thanks to <a class="ais-Stats-link" href="${poweredByUrl}" target="_blank">Algolia</a>`;
              const { query, nbHits } = statOptions;
              const pluralizedHitName = nbHits === 1 ? hitName : `${hitName}s`;
              if (!query) {
                return `${nbHits} ${pluralizedHitName} indexed, ${suffix}`;
              }
              return `${nbHits} ${pluralizedHitName} found, ${suffix}`;
            },
          },
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
      {
        type: algoliaWidgets.pagination,
        options: {
          container: '#pagination',
        },
      },
    ];

    // Enhance widgets with some default values
    let defaultUiState = {};
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
        widget.type = algoliaWidgets.refinementList;
      }

      // Convert string types to real types
      if (isString(widget.type)) {
        widget.type = algoliaWidgets[widget.type];
      }

      // Build the default UI state based on the defaultValues
      if (widget.defaultValue) {
        const keyName = initialUiStateKey(widget.type);
        const { attribute } = widget.options;

        defaultUiState = merge({}, defaultUiState, {
          [keyName]: {
            [attribute]: widget.defaultValue,
          },
        });
      }

      return widget;
    });

    algolia
      .init(credentials, { defaultUiState })
      .setWidgets(allWidgets)
      .setTransforms(transforms)
      // .onDisplay(hit => {
      //   console.info(hit.picture);
      // })
      .start();

    lazyload.init();
  },
};
