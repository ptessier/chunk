import { createError } from 'apollo-errors';

export const UserNotFoundError = createError('UserNotFoundError', {
  message: 'User not found',
});
