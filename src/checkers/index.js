const { flow, without } = require('lodash');
const checkersHash = require('require-all')(__dirname);

const checkers = flow(
  Object.keys,
  (keys) => without(keys, 'index'),
  (keys) => keys.map((checker) => ({ checker, checkFn: checkersHash[checker] })),
)(checkersHash);

function check(line, context, config) {
  return checkers.reduce((checkResults, { checker, checkFn }) => {
    const message = checkFn(line, context, config);

    return message
      ? [...checkResults, {
        ...context, checker, message, line,
      }]
      : checkResults;
  }, []);
}

module.exports = check;
