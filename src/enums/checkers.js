const path = require('path');

const checkers = require('require-all')({
  dirname: path.join(__dirname, '../', 'checkers'),
  excludeDirs: 'decorators',
  filter: /^((?!index).*)\.js$/,
});

module.exports = Object.freeze(checkers);
