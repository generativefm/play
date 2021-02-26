import retryable from './retryable';

describe('retryable', () => {
  it('should return a function that returns a promise which that resolves with the same value as the one returned by getPromise', async () => {
    const expectedValue = 'expectedValue';
    const getPromise = () => Promise.resolve(expectedValue);
    const actualValue = await retryable(getPromise)();
    expect(actualValue).to.equal(expectedValue);
  });
  it('should return a function that tries to get the promise again if it fails', async () => {
    let calledOnce = false;
    const expectedValue = 'expectedValue';
    const getPromise = () => {
      if (calledOnce) {
        return Promise.resolve(expectedValue);
      }
      calledOnce = true;
      return Promise.reject(new Error('not this time'));
    };
    const actualValue = await retryable(getPromise, { timeout: 0 })();
    expect(actualValue).to.equal(expectedValue);
    expect(calledOnce).to.be.true;
  });
  it('should return a function that rejects only if the promise rejected every time', async () => {
    const expectedRejection = new Error('Nope');
    const getPromise = () => Promise.reject(expectedRejection);
    let actualRejection;
    try {
      await retryable(getPromise, { attemptsRemaining: 2, timeout: 0 })();
    } catch (error) {
      actualRejection = error;
    }
    expect(actualRejection).to.equal(expectedRejection);
  });
  it('should return a function that waits for the specified duration before making another attempt', async () => {
    const { setTimeout } = window;
    const expectedTimeout = 1234;
    let timeoutCalled = false;
    window.setTimeout = (fn, timeout) => {
      timeoutCalled = true;
      expect(timeout).to.equal(expectedTimeout);
      fn();
    };
    const expectedValue = 'expectedValue';
    const getPromise = () => {
      if (timeoutCalled) {
        return Promise.resolve(expectedValue);
      }
      return Promise.reject(new Error('not this time'));
    };
    const result = await retryable(getPromise, { timeout: expectedTimeout })();
    expect(timeoutCalled).to.be.true;
    expect(result).to.equal(expectedValue);
    Object.assign(window, { setTimeout });
  });
});
