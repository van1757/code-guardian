const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { once } = require('events');
const readDir = require('fs-readdir-recursive');

function getFiles(dirPath, excludes = []) {
  const relativeFiles = readDir(dirPath, (name, index, dir) => {
    const full = path.join(dir, name);

    return excludes.every((exclude) => !full.includes(exclude));
  });

  return relativeFiles.map((relative) => path.join(dirPath, relative));
}

async function readByLine(filePath, callback) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let prev;
  let index = 0;

  rl.on('line', (line) => {
    const context = { prev, filePath, index };

    callback(line, context);

    index += 1;
    prev = line;
  });

  await once(rl, 'close');
}

function readLines(filePath) {
  return fs.readFileSync(filePath, 'utf8').split('\n');
}

module.exports = {
  getFiles,
  readByLine,
  readLines,
};
