// Generate a unique name from a widgetDefinition
module.exports = (widgetDefinition) => {
  const attribute =
    widgetDefinition &&
    widgetDefinition.options &&
    widgetDefinition.options.attribute;
  const slug = attribute.replace('.', '-');
  return `filter-${slug}`;
};
