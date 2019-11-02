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
    default: '.fileignore',
  })
  .option('entropyThreshold', {
    default: 2,
  });

module.exports = {
  argv,
  checkerConfig: pick(argv, 'entropyThreshold'),
};
