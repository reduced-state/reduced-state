

const initTypeDescriptors = require('../src/initTypeDescriptors');

const buildModuleActions = require('../src/buildModuleActions');
const buildModuleSelectors = require('../src/buildModuleSelectors');
const buildModuleReducer = require('../src/buildModuleReducer');

const TYPE_SET = {
  number: {
    add: {
      type: 'number-add',
      creator: value => ({ type: 'number-add', payload: { value } }),
      handler: (state, action) => state + action.payload.value,
    },
  },
  string: {
    concat: {
      type: 'string-concat',
      creator: value => ({ type: 'string-concat', payload: { value } }),
      handler: (state, action) => state + action.payload.value,
    },
  },
};

const type = initTypeDescriptors(TYPE_SET);

const numberModel = {
  numberBox: {
    initZero: type.number(0),
    initTen: type.number(10),
  },
};


const actions = buildModuleActions(TYPE_SET)(numberModel)();
const reducer = buildModuleReducer(TYPE_SET)(numberModel)();


describe('must create a store', () => {
  it('with the correct structure and initial state', () => {
    const state = reducer();

    expect(typeof state.numberBox).toBe('object');
    expect(state.numberBox.initZero).toBe(0);
    expect(state.numberBox.initTen).toBe(10);
  });

  it('that reacts to the actions', () => {
    const state = reducer(undefined, actions.numberBox.initTen.add(3));
    expect(state.numberBox.initTen).toBe(13);
  });
});


describe('must work with mountpoints', () => {
  const MOUNT_POINT = 'myPlugin';

  const m1actions = buildModuleActions(TYPE_SET)(numberModel)([MOUNT_POINT]);
  const m1reducer = buildModuleReducer(TYPE_SET)(numberModel)([MOUNT_POINT]);
  const m1selectors = buildModuleSelectors(numberModel)([MOUNT_POINT]);

  const rootReducer = (state, action) => ({
    [MOUNT_POINT]: m1reducer(state, action),
  });

  it('with the correct structure and initial state', () => {
    const state = m1reducer();

    expect(typeof state.numberBox).toBe('object');
    expect(state.numberBox.initZero).toBe(0);
    expect(state.numberBox.initTen).toBe(10);
  });

  it('that reacts to the actions', () => {
    const state = m1reducer(undefined, m1actions.numberBox.initTen.add(3));

    expect(state.numberBox.initTen).toBe(13);
  });

  it('that works with selectors', () => {
    const rootState = rootReducer();
    expect(m1selectors.numberBox.initTen(rootState))
      .toEqual(rootState[MOUNT_POINT].numberBox.initTen);
  });
});
