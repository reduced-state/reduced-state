
const { createStore, combineReducers } = require('redux');

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

const stringModel = {
  stringBox: {
    initEnpty: type.string(''),
    initHello: type.string('hello'),
  },
};

const model2 = {
  ...numberModel,
  ...stringModel,
};


const actions = buildModuleActions(TYPE_SET)(numberModel)();
const reducer = buildModuleReducer(TYPE_SET)(numberModel)();


const actions2 = buildModuleActions(TYPE_SET)(model2)();
const reducer2 = buildModuleReducer(TYPE_SET)(model2)();

describe('must create a store', () => {
  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(reducer);
  });

  it('with the correct structure and initial state', () => {
    const state = reduxStore.getState();

    expect(typeof state.numberBox).toBe('object');
    expect(state.numberBox.initZero).toBe(0);
    expect(state.numberBox.initTen).toBe(10);
  });

  it('that reacts to the actions', () => {
    reduxStore.dispatch(actions.numberBox.initTen.add(3));
    const state = reduxStore.getState();
    expect(state.numberBox.initTen).toBe(13);
  });
});

describe('must retain state on replaceReducer', () => {
  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(reducer);
  });

  it('after dispatching actions', () => {
    reduxStore.dispatch(actions.numberBox.initTen.add(3));
    expect(reduxStore.getState().numberBox.initTen).toBe(13);

    reduxStore.replaceReducer(reducer2);
    reduxStore.dispatch(actions2.stringBox.initHello.concat(', world'));

    expect(reduxStore.getState().numberBox.initTen).toBe(13);
    expect(reduxStore.getState().stringBox.initHello).toEqual('hello, world');
  });
});


describe('must work with mountpoints', () => {
  const MOUNT_POINT = 'myPlugin';

  const m1actions = buildModuleActions(TYPE_SET)(numberModel)([MOUNT_POINT]);
  const m1reducer = buildModuleReducer(TYPE_SET)(numberModel)([MOUNT_POINT]);
  const m1selectors = buildModuleSelectors(numberModel)([MOUNT_POINT]);

  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(combineReducers({
      [MOUNT_POINT]: m1reducer,
    }));
  });

  it('with the correct structure and initial state', () => {
    const rootState = reduxStore.getState();
    const state = rootState[MOUNT_POINT];

    expect(typeof state.numberBox).toBe('object');
    expect(state.numberBox.initZero).toBe(0);
    expect(state.numberBox.initTen).toBe(10);
  });

  it('that reacts to the actions', () => {
    reduxStore.dispatch(m1actions.numberBox.initTen.add(3));

    const rootState = reduxStore.getState();
    const state = rootState[MOUNT_POINT];

    expect(state.numberBox.initTen).toBe(13);
  });

  it('that works with selectors', () => {
    const rootState = reduxStore.getState();
    expect(m1selectors.numberBox.initTen(rootState))
      .toEqual(rootState[MOUNT_POINT].numberBox.initTen);
  });
});
