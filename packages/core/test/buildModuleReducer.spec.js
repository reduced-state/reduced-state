
const buildModuleReducer = require('../src/buildModuleReducer');

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
const reducer = buildModuleReducer(TYPE_SET)(numberModel)([MOUNT_POINT]);

it('it should return a reducer function', () => {
  expect(typeof reducer).toBe('function');
});

it('the reducer called without arguments should return the initial state (as specified in the model)', () => {
  const initialState = reducer();
  expect(initialState.numberBox.initZero).toBe(0);
  expect(initialState.numberBox.initTen).toBe(10);
});

it('should react to actions', () => {
  const actionAdd = {
    type: 'number-add',
    payload: { value: 7 },
    meta: { targetId: 'myMountPoint.numberBox.initTen' },
  };
  const state = reducer(undefined, actionAdd);
  expect(state.numberBox.initTen).toBe(17);
});
