module.exports = {
  options: {
    placeholder: 'Type any keyword...',
    hitName: 'item', // Name of the items to search
    transforms: {}, // Transforms to apply to the hits
    sidebar: [], // Widgets to add in the sidebar
    onSearch: () => {}, // Additional method to call on each search
  },
};
