module.exports = {
  parser: "babel-eslint",
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  extends: [
    'airbnb'
  ],
  globals: {
    exampleGlobalVariable: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  plugins: [
    "mocha"
  ]
};
