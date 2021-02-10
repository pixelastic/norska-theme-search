/**
 * Display either "<< Show less" or "Show all >>" in refinement lists
 * @param {boolean} isShowingMore True if is currently expanded
 * @returns {string} String to use for the button text
 **/
module.exports = ({ isShowingMore }) => {
  return isShowingMore ? '<< Show less' : 'Show all >>';
};
