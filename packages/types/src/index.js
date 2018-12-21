

const arrayType = require('./array');
const objectType = require('./object');
const numberType = require('./number');
const booleanType = require('./boolean');
const stringType = require('./string');


const initTypeDescriptors = require('../initTypeDescriptors');
const buildModule = require('../buildModule');
const buildModuleActions = require('../buildModuleActions');
const buildModuleReducer = require('../buildModuleReducer');
const buildModuleSelectors = require('../buildModuleSelectors');


const TYPE_SET = {
  array: arrayType,
  object: objectType,
  boolean: booleanType,
  number: numberType,
  string: stringType,
};


module.exports = {
  TYPE_SET,
  type: initTypeDescriptors(TYPE_SET),
  buildModule: buildModule(TYPE_SET),
  buildModuleActions: buildModuleActions(TYPE_SET),
  buildModuleReducer: buildModuleReducer(TYPE_SET),
  buildModuleSelectors,
};
