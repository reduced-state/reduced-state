
require('@reduced-state/test-utils/jestMatchers');
const typeObject = require('../../src/string');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
