const wait = ({ timeout }) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const retryable = (
  getPromise,
  { attemptsRemaining = 2, timeout = 500 } = {}
) => () =>
  getPromise().catch((err) => {
    console.error('Attempt failed:', err);
    if (attemptsRemaining <= 0) {
      throw err;
    }
    return wait({ timeout }).then(
      retryable(getPromise, {
        attemptsRemaining: attemptsRemaining - 1,
        timeout: timeout * 2,
      })
    );
  });

export default retryable;
