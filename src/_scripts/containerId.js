// Generate a unique name from a widgetDefinition
module.exports = (widget) => {
  const attribute = widget && widget.options && widget.options.attribute;
  const slug = attribute.replace(/\./g, '-');
  return `filter-${slug}`;
};
