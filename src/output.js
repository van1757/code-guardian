/* eslint-disable no-console */

const Reset = '\x1b[0m';
const FgRed = '\x1b[31m';
const FgGreen = '\x1b[32m';

// TODO: make outputting much more flexible
function outputFileResult(file, results) {
  if (results.length) {
    console.log(FgGreen, file);

    results.forEach(({
      checker, message, line, lineNumber,
    }) => {
      console.log(Reset, `\t[${checker.toUpperCase()}]: ${message}`);

      if (line && lineNumber) {
        console.log(FgRed, `\t\t${lineNumber}: ${line}`);
      }
    });

    console.log(Reset);
  }
}

module.exports = {
  output: outputFileResult,
};
