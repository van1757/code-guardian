const path = require('path');
const { pick } = require('lodash');
const { argv } = require('yargs')
  .option('path', {
    alias: 'p',
    describe: 'Repo path to check',
    default: './',
  })
  .option('excludes', {
    alias: 'e',
    describe: 'File path to excludes file',
    default: path.join(__dirname, '../', '.fileignore'),
  })
  .option('entropyThreshold', {
    default: 2,
  });

// TODO: add arguments to FILTER IN only certain checkers
// example: $ code-guardian # starts all checkers
// example: $ code-guardian -s # starts only secret checker

module.exports = {
  argv,
  checkerConfig: pick(argv, 'entropyThreshold'),
};
