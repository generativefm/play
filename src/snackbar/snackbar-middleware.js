export const listeners = [];

export const subscribe = (fn) => {
  listeners.push(fn);
  return () => {
    const index = listeners.indexOf(fn);
    if (index >= 0) {
      listeners.splice(index, 1);
    }
  };
};

const snackbarMiddleware = () => (next) => (action) => {
  const result = next(action);
  if (action.meta && action.meta.snackbar) {
    listeners.slice().forEach((listener) => listener(action.meta.snackbar));
  }
  return result;
};

export default snackbarMiddleware;
