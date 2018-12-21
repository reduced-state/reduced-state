
require('@reduced-state/test-utils/jestMatchers');
const typeObject = require('../../src//number');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
