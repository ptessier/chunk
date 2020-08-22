import { createError } from 'apollo-errors';

export const InvalidPasswordError = createError('InvalidPasswordError', {
  message: 'Invalid password',
});
