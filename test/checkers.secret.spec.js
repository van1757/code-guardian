const assert = require('assert');

const check = require('../src/checkers/secret');

describe('secret.js', () => {
  it('returns false for empty string', () => {
    const result = check('', {}, { entropyThreshold: 1 });

    assert.equal(result, false);
  });

  it('returns a message for a secret string', () => {
    const result = check('isajdfkjaf0s09dfi982938odsfioasjdf', {}, { entropyThreshold: 1 });

    assert.equal(result, 'The line may contain sensitive data (entropy: 2.269477490132094)');
  });
});
