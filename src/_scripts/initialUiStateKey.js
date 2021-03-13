// Return the initialUiState key based on the widget
// Reference: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
module.exports = (widget) => {
  const { name } = widget.type;
  if (name === 'rangeSlider') {
    return 'range';
  }
  return name;
};
