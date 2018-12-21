const { PREFIX } = require('../const');

const type = `${PREFIX}number.multiply`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => (state === null ? state : state * action.payload.value);


module.exports = {
  type,
  creator,
  handler,
};
