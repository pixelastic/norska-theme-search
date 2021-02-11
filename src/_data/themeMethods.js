const containerId = require('../_scripts/containerId');
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
};
