const containerId = require('../_scripts/containerId');
const shouldHideWidget = require('../_scripts/shouldHideWidget');
module.exports = {
  // Load the file in the theme, or the one in the host
  template(templateName, { include }) {
    const templatePath = `_includes/templates/${templateName}.pug`;
    try {
      return include(templatePath);
    } catch (_err) {
      return `Overwrite this template by creating ${templatePath}`;
    }
  },
  // Unique identifier for a container
  containerId,
  // Check if a specific widget should be hidden
  shouldHideWidget,
};
