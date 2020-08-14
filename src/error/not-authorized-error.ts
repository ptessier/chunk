import { createError } from 'apollo-errors';

export const NotAuthorizedError = createError('NotAuthorizedError', {
  message: 'You are not authorized.',
});
