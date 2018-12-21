require('@reduced-state/test-utils/jestMatchers');

const actionObject = require('../../src//number/set');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});


describe('action handler', () => {
  describe('when trying to set a non-numeric type', () => {
    const oldState = 0;

    it('string, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { value: '42' } });
      expect(newState).toBe(null);
    });

    it('null, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { value: null } });
      expect(newState).toBe(null);
    });

    it('undefined, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { } });
      expect(newState).toBe(null);
    });

    it('NaN, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { value: NaN } });
      expect(newState).toBe(null);
    });
  });


  describe('when trying to set a numeric type', () => {
    const oldState = null;

    it('applying a number should set the state to the new value', () => {
      const newState = actionReducer(oldState, { type, payload: { value: 42 } });
      expect(newState).toBe(42);
    });

    it('applying 0 should set the state to 0', () => {
      const newState = actionReducer(oldState, { type, payload: { value: 0 } });
      expect(newState).toBe(0);
    });
  });
});

describe('action creator', () => {
  const VALUE = 42;

  it('creates an action with the correct type', () => {
    const action = creator(VALUE);
    expect(action.type).toBe(type);
  });

  it('creates an action with the correct properties', () => {
    const action = creator(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});
