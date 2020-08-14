export const isFunction = (fn: any) => typeof fn === 'function' || fn instanceof Function;

export const Promisify = (fn: any) => {
  return (...args: any) =>
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

export const isNotNullOrUndefined = (val: any) => val !== null && val !== undefined;
