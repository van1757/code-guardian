const assert = require('assert');

const subject = require('../src/checkers/private.keys')();

describe('secret.js', () => {
  it('returns false for non private key file', () => {
    const results = subject('./test/resources/no.sensitive.data.file');

    assert.deepStrictEqual(results, []);
  });

  it('returns a message for a secret string', () => {
    const [result] = subject('./test/resources/private.key.file.pem');

    assert.equal(result.message, 'File ./test/resources/private.key.file.pem is a private key file');
  });
});
