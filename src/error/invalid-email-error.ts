import { createError } from 'apollo-errors';

export const InvalidEmailError = createError('InvalidEmailError', {
  message: 'Email is invalid',
});
