const assert = require('assert');

const buildCheck = require('../src/checkers/secret');

describe('secret.js', () => {
  it('returns false for empty string', () => {
    const subject = buildCheck({
      readFilesFn: () => ['file.code'],
      readLinesFn: () => ['{', 'const a = 1 + 1;', '}'],
    });
    const results = subject('./', {}, { entropyThreshold: 1 });

    assert.deepStrictEqual(results, []);
  });

  it('returns a message for a secret string', () => {
    const subject = buildCheck({
      readFilesFn: () => ['file.code'],
      readLinesFn: () => ['isajdfkjaf0s09dfi982938odsfioasjdf'],
    });
    const [result] = subject('./', {}, { entropyThreshold: 1 });

    assert.equal(result.message, 'The line may contain sensitive data (entropy: 2.269477490132094)');
  });
});
