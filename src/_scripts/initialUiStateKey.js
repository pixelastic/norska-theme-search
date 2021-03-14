const algoliaWidgets = require('norska/frontend/algolia/widgets');
/**
 * Returns the initialUiState key for a given widget
 * There is no 1:1 mapping between the name of a widget and the key in initialUiState. So we need to use this method to do the mapping.
 * Also note that in production, the widget.name property is no longer
 * accessible, so we need to commpare to the real widgets
 * Reference: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
 * @param {object} algoliaWidget Algolia widget
 * @returns {string} initialUiState key
 */
module.exports = (algoliaWidget) => {
  if (algoliaWidget === algoliaWidgets.refinementList) {
    return 'refinementList';
  }
  if (algoliaWidget === algoliaWidgets.rangeSlider) {
    return 'range';
  }
};
