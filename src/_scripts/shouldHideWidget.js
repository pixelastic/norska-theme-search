/**
 * Check if a given widget should be hidden.
 * A widget should be hidden if it has a .hidden key set to a method
 * that returns true when called with the current generation data
 * @param {object} widget Widget to check
 * @param {object} data Current data passed to rendering
 * @returns {boolean} True if should hide
 **/
module.exports = (widget, data) => {
  if (!widget.hidden) {
    return false;
  }
  return widget.hidden(data);
};
