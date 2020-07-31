export const isFunction = (fn) => typeof fn === 'function' || fn instanceof Function;

export const Promisify = (fn) => {
  return (...args) =>
    new Promise((resolve, reject) => {
      try {
        return Promise.resolve(fn(...args)).then(
          (r) => resolve(r),
          (e) => reject(e),
        );
      } catch (e) {
        return reject(e);
      }
    });
};

export const isNotNullOrUndefined = (val) => val !== null && val !== undefined;
