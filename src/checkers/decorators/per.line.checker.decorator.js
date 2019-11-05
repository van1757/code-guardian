const { flow, compact } = require('lodash');

const fs = require('../../fs');

function decorate(base, readLinesFn = fs.readLines) {
  return function check(file, context, config) {
    return flow(
      readLinesFn,
      (lines) => lines.map((l, i) => base(l, { ...context, line: l, lineNumber: i + 1 }, config)),
      compact,
    )(file);
  };
}

module.exports = decorate;
