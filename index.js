/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const {
  flow, compact, pick, flatten,
} = require('lodash');
const { argv } = require('yargs')
  .option('path', {
    alias: 'p',
    describe: 'Repo path to check',
    default: './',
  })
  .option('excludes', {
    alias: 'e',
    describe: 'File path to excludes file',
    default: '.fileignore',
  })
  .option('entropyThreshold', {
    default: 1,
  });

const aspects = require('./src/aspects');
const file = require('./src/file');
const { output } = require('./src/output');

const FILE_EXCLUDES = flow(
  file.readLines,
  compact,
)(argv.excludes);

const { path } = argv;
const config = pick(argv, 'entropyThreshold');
const checkers = Object.keys(aspects).map((aspect) => ({ aspect, check: aspects[aspect] }));
const checkLines = (lines) => lines.map((line, lineNumber) => checkers.map(({ aspect, check }) => {
  const message = check(line, {}, config);

  return message ? {
    aspect,
    message,
    line,
    lineNumber: lineNumber + 1,
  } : false;
}));

(async () => {
  const files = file.getFiles(path, FILE_EXCLUDES);
  let hasViolations = false;

  for (const sourceFile of files) {
    const sourceFileResults = flow(
      file.readLines,
      checkLines,
      flatten,
      compact,
    )(sourceFile);

    output(sourceFile, sourceFileResults);

    hasViolations = hasViolations || sourceFileResults.length;
  }

  process.exit(hasViolations ? 1 : 0);
})();
