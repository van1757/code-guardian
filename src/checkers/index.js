const { flow, without } = require('lodash');
const checkersHash = require('require-all')(__dirname);

const checkers = flow(
  Object.keys,
  (keys) => without(keys, 'index'),
  (keys) => keys.map((checker) => ({ checker, checkFn: checkersHash[checker] })),
)(checkersHash);

function check(line, context, config) {
  return checkers.reduce((results, { checker, checkFn }) => {
    const message = checkFn(line, context, config);

    return message
      ? [...results, {
        ...context, checker, message, line,
      }]
      : results;
  }, []);
}

module.exports = check;
