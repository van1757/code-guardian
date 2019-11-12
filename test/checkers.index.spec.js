const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('index.js', () => {
  describe('#checkers', () => {
    const requireAll = sinon.stub();

    context('when checkers are present', () => {
      beforeEach(() => {
        requireAll.returns({ testKey1: 'testValue1', testKey2: 'testValue2' });
      });

      it('returns array with checkers keys', () => {
        const { checkers } = proxyquire('../src/checkers', {
          'require-all': requireAll
        });

        assert.deepStrictEqual(checkers, ['testKey1', 'testKey2']);
      });
    });

    context('when checkers are present', () => {
      beforeEach(() => {
        requireAll.returns({});
      });

      it('returns empty array', () => {
        const { checkers } = proxyquire('../src/checkers', {
          'require-all': requireAll
        });

        assert.deepStrictEqual(checkers, []);
      });
    });
  });
});
