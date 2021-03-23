const current = require('../containerId');
describe('containerId', () => {
  it.each([
    ['authorName', 'filter-authorName'],
    ['author.name', 'filter-author-name'],
    ['pullRequest.checks.state', 'filter-pullRequest-checks-state'],
  ])('%s', async (input, expected) => {
    const actual = current({ options: { attribute: input } });
    expect(actual).toEqual(expected);
  });
});
