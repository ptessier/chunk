import { createError } from 'apollo-errors';

export const InvalidEmailConfirmTokenError = createError('InvalidEmailConfirmTokenError', {
  message: 'Email confirmation token has expired',
});
