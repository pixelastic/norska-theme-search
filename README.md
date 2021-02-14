# norska-theme-search

## Setup

Create a file in `src/_scripts/config.js` with a `credentials` key and
a `widget` keys to be used for the sidebar.

Also need a `_data/theme.js` that resolve to `_scripts/config.js`
This is used by the sidebar template of the theme, and I couldn't find a way to
make it require a file in the scripts folder of the host

Possible to pass the type of the widget as a string in tne config

