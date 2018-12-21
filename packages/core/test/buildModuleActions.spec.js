
const buildModuleActions = require('../src/buildModuleActions');

const TYPE_SET = {
  number: {
    add: {
      type: 'number-add',
      creator: value => ({ type: 'number-add', payload: { value } }),
      handler: (state, action) => state + action.payload.value,
    },
  },
};

// initTypeDescriptors automates the creation of the following object of functions
const type = {
  number: initialValue => ({ type: 'number', initialValue, isLeaf: true }),
};

const numberModel = {
  numberBox: {
    initZero: type.number(0),
    initTen: type.number(10),
  },
};

const MOUNT_POINT = 'myMountPoint';
const actions = buildModuleActions(TYPE_SET)(numberModel)([MOUNT_POINT]);

it('it should return an object with the same structure as the model', () => {
  expect(actions.numberBox).toBeTruthy();
  expect(actions.numberBox.initZero).toBeTruthy();
  expect(actions.numberBox.initTen).toBeTruthy();
});

it('each leaf of the object tree should be an object', () => {
  expect(typeof actions.numberBox).toBe('object');
  expect(typeof actions.numberBox.initZero).toBe('object');
  expect(typeof actions.numberBox.initTen).toBe('object');
});

it('each leaf of the object tree should contain the action creators for its type', () => {
  expect(typeof actions.numberBox.initZero.add).toBe('function');
  expect(typeof actions.numberBox.initTen.add).toBe('function');
});

it('actions returned by the action creators should have action.meta.targetId', () => {
  const actionInitZeroAdd = actions.numberBox.initZero.add(3);
  expect(actionInitZeroAdd.meta.targetId).toBe('myMountPoint.numberBox.initZero');

  const actionInitTenAdd = actions.numberBox.initTen.add(3);
  expect(actionInitTenAdd.meta.targetId).toBe('myMountPoint.numberBox.initTen');
});
