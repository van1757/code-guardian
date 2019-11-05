const { compact } = require('lodash');

const secret = require('./secret');
const privateKey = require('./private.keys');

// TODO: make this array auto-generated
// maybe by defining decorators inside a target checker
const checkers = [
  { checker: 'secret', checkFn: secret },
  { checker: 'private key', checkFn: privateKey },
];

function check(file, context, config) {
  return compact(checkers.reduce((results, { checker, checkFn }) => [
    ...results,
    ...checkFn(file, { ...context, checker }, config),
  ], []));
}

module.exports = check;
