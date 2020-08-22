import v from 'validator';

export const validator = Object.freeze({
  isEmail(email: string, options = {}) {
    return v.isEmail(email, options);
  },
});
