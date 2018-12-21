
require('@reduced-state/test-utils/jestMatchers');
const typeObject = require('../../src//object');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
