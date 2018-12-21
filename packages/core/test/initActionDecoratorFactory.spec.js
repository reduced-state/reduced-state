const initActionDecoratorFactory = require('../src/initActionDecoratorFactory');

const USERTYPE_CONFIG = {
  userType: {
    setPassword: {
      type: 'SET_PASSWORD',
      creator: newPassword => ({ type: 'SET_PASSWORD', payload: { newPassword } }),
      handler: (state, action) => (state
        ? { ...state, password: action.payload.newPassword }
        : state),
    },
  },
};

/*
  initActionDecoratorFactory

  Usage:
  initActionDecoratorFactory(optionalCustomConfig)(typeName)(targetId)

  Example:
  const bindActions = generateBindActions();
  const bindStringActions = bindActions('string');
  const myTargetActions = bindStringActions('myTarget');
  // myTargetActions is an object of action creators for the string type, and targetId = 'myTarget'
*/

describe('called without config', () => {
  let bindActions;

  beforeEach(() => {
    bindActions = initActionDecoratorFactory();
  });

  it('returns a function', () => {
    expect(typeof bindActions).toBe('function');
  });

  describe('returns a function, which', () => {
    let bindBooleanActions;

    beforeEach(() => {
      bindBooleanActions = bindActions('boolean');
    });

    it('takes an existing type as parameter, and returns a function', () => {
      expect(typeof bindBooleanActions).toBe('function');
    });

    describe('takes an existing type as parameter, and returns a function, which', () => {
      const MY_TARGET_ID = 'myTarget';

      it('takes a target id and returns an object of bound action creators', () => {
        const myTargetActions = bindBooleanActions(MY_TARGET_ID);
        expect(myTargetActions).toEqual({});
      });
    });
  });
});


describe('called with custom config', () => {
  let bindActions;

  beforeEach(() => {
    bindActions = initActionDecoratorFactory(USERTYPE_CONFIG);
  });

  it('returns a function', () => {
    expect(typeof bindActions).toBe('function');
  });

  describe('returns a function, which', () => {
    let bindUserActions;

    beforeEach(() => {
      bindUserActions = bindActions('userType');
    });

    it('takes an existing type as parameter, and returns a function', () => {
      expect(typeof bindUserActions).toBe('function');
    });

    describe('takes an existing type as parameter, and returns a function, which', () => {
      const MY_TARGET_ID = 'myTarget';

      it('takes a target id and returns an object of bound action creators', () => {
        const myTargetActions = bindUserActions(MY_TARGET_ID);
        expect(typeof myTargetActions.setPassword).toBe('function');
        expect(myTargetActions.setPassword('hello123').meta.targetId).toBe(MY_TARGET_ID);
      });
    });
  });
});
