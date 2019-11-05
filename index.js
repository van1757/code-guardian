#!/usr/bin/env node

/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

const { flow, compact } = require('lodash');

const { argv, checkerConfig } = require('./src/arguments');
const check = require('./src/checkers');
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
    const sourceFileResults = check(sourceFile, {}, checkerConfig);

    output(sourceFile, sourceFileResults);

    hasViolations = hasViolations || sourceFileResults.length;
  }

  process.exit(hasViolations ? 1 : 0);
})();
