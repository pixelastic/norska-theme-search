module.exports = {
  template(templateName, { include }) {
    const templatePath = `_includes/templates/${templateName}.pug`;
    try {
      return include(templatePath);
    } catch (_err) {
      return `Overwrite this template by creating ${templatePath}`;
    }
  },
};
