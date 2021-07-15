module.exports = {
  options: {
    placeholder: 'Type any keyword...',
    hitName: 'item', // Name of the items to search
    transforms: {}, // Transforms to apply to the hits
    widgets: [], // Additional widgets to add at runtime
    onSearch: () => {}, // Additional method to call on each search
  },
};
