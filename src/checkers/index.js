const { compact } = require('lodash');

const fs = require('../fs');

const buildSecretChecker = require('./secret');
const buildPrivateKeyChecker = require('./private.keys');

const DEPENDENCIES = {
  readLinesFn: fs.readLines,
};

// TODO: make this array auto-generated
// maybe by defining decorators inside a target checker
const checkers = [
  { checker: 'secret', checkFn: buildSecretChecker(DEPENDENCIES) },
  { checker: 'private key', checkFn: buildPrivateKeyChecker(DEPENDENCIES) },
];

function check(file, context, config) {
  return compact(checkers.reduce((results, { checker, checkFn }) => [
    ...results,
    ...checkFn(file, { ...context, checker }, config),
  ], []));
}

module.exports = check;
