
require('@reduced-state/test-utils/jestMatchers');
const typeObject = require('../../src//boolean');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
