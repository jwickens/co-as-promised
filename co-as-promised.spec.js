const coAsPromised = require('../co-as-promised');
const co = require('co');

function *testGenerator (value = true) {
  return Promise.resolve(value)
}

function *failGenerator () {
  return Promise.reject('nope cant do that')
}

function *throwGenerator () {
  throw new Error('Yep that was an error')
}

describe('co-as-promised', () => {
  test('works with args', async () => {
    const result = await coAsPromised(co(testGenerator), true)
    expect(result).toBe(true);
  })
  test('works without args', async () => {
    const result = await coAsPromised(co(testGenerator))
    expect(result).toBe(true);
  })
  test.skip('throws correctly with rejected promise', () => {
    return expect(coAsPromised(co(failGenerator))).rejects.toMatch('nope cant do that')
  });
  test('throws correctly with throw in generator', () => {
    return expect(coAsPromised(co(throwGenerator))).rejects.toMatchObject({message: 'Yep that was an error'})
  })
});
