
const buildModuleSelectors = require('../src/buildModuleSelectors');


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
const selectors = buildModuleSelectors(numberModel)([MOUNT_POINT]);

it('it should return an object with the same structure as the model', () => {
  expect(selectors.numberBox).toBeTruthy();
  expect(selectors.numberBox.initZero).toBeTruthy();
  expect(selectors.numberBox.initTen).toBeTruthy();
});

it('each leaf of the object tree should be a function (selector)', () => {
  expect(typeof selectors.numberBox).toBe('object');
  expect(typeof selectors.numberBox.initZero).toBe('function');
  expect(typeof selectors.numberBox.initTen).toBe('function');
});


it('each selector should select the object at the path: mountpoint + selector path', () => {
  const fakeState = {
    [MOUNT_POINT]: {
      numberBox: {
        initZero: 123,
        initTen: 456,
      },
    },
  };

  expect(selectors.numberBox.initZero(fakeState))
    .toBe(fakeState[MOUNT_POINT].numberBox.initZero);

  expect(selectors.numberBox.initTen(fakeState))
    .toBe(fakeState[MOUNT_POINT].numberBox.initTen);
});

it('selectors should return undefined if their property does not exist in the state', () => {
  const fakeState = {};

  expect(selectors.numberBox.initZero(fakeState)).toBeUndefined();
  expect(selectors.numberBox.initTen(undefined)).toBeUndefined();
});
