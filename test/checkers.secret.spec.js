const assert = require('assert');

const check = require('../src/checkers/secret');

describe('secret.js', () => {
  it('returns false for empty string', () => {
    const results = check('./test/resources/no.sensitive.data.file', {}, { entropyThreshold: 1 });

    assert.deepStrictEqual(results, []);
  });

  it('returns a message for a secret string', () => {
    const [result] = check('./test/resources/sensitive.data.file', {}, { entropyThreshold: 1 });

    assert.equal(result.message, 'The line may contain sensitive data (entropy: 2.269477490132094)');
  });
});
