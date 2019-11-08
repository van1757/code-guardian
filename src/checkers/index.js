const { compact } = require('lodash');

const buildSecretChecker = require('./secret');
const buildPrivateKeyChecker = require('./private.keys');

module.exports = (dependencies) => {
  // TODO: make this array auto-generated
  // maybe by defining decorators inside a target checker
  const checkers = [
    { checker: 'secret', checkFn: buildSecretChecker(dependencies) },
    { checker: 'private key', checkFn: buildPrivateKeyChecker(dependencies) },
  ];

  return function check(repo, context, config) {
    return checkers.reduce((results, { checker, checkFn }) => compact([
      ...results,
      ...checkFn(repo, { ...context, checker }, config),
    ]), []);
  };
};
