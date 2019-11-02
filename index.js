/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

const { flow, compact, flatten } = require('lodash');

const { argv, checkerConfig } = require('./src/arguments');
const checkLine = require('./src/checkers');
const fs = require('./src/fs');
const { output } = require('./src/output');

const FILE_EXCLUDES = flow(
  fs.readLines,
  compact,
)(argv.excludes);

const { path: folder } = argv;

(async () => {
  const files = fs.getFiles(folder, FILE_EXCLUDES);

  let hasViolations = false;

  for (const sourceFile of files) {
    const sourceFileResults = flow(
      fs.readLines,
      (lines) => lines.map((l, i) => checkLine(l, { lineNumber: i + 1 }, checkerConfig)),
      flatten,
    )(sourceFile);

    output(sourceFile, sourceFileResults);

    hasViolations = hasViolations || sourceFileResults.length;
  }

  process.exit(hasViolations ? 1 : 0);
})();
