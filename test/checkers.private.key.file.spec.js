const assert = require('assert');

const check = require('../src/checkers/private.keys');

describe('secret.js', () => {
  it('returns false for non private key file', () => {
    const results = check('./test/resources/no.sensitive.data.file', {}, { entropyThreshold: 1 });

    assert.deepStrictEqual(results, []);
  });

  it('returns a message for a secret string', () => {
    const [result] = check('./test/resources/private.key.file.pem', {}, { entropyThreshold: 1 });

    assert.equal(result.message, 'File ./test/resources/private.key.file.pem is a private key file');
  });
});
