const { compact, pick, reduce } = require('lodash');
const checkers = require('requireindex')(__dirname);

function filterCheckers(allCheckers, selectedCheckers) {
  return selectedCheckers.length
    ? pick(allCheckers, selectedCheckers)
    : allCheckers;
}

module.exports = (dependencies) => {
  return function check(repo, context, selectedCheckers, config) {
    const filteredCheckers = filterCheckers(checkers, selectedCheckers);

    return reduce(filteredCheckers, (results, checkFn, checker) => compact([
      ...results,
      ...checkFn(dependencies)(repo, { ...context, checker }, config),
    ]), []);
  };
};
