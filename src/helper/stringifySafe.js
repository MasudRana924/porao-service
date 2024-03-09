const util = require('util');

const stringifySafe = (obj, replacer = null, space = 0) => {
  return JSON.stringify(util.inspect(obj), replacer, space);
};

module.exports = { stringifySafe };