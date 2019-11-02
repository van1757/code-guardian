const { omit } = require('lodash');
const aspects = require('require-all')(__dirname);

module.exports = omit(aspects, 'index');
