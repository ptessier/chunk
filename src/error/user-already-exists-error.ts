import { createError } from 'apollo-errors';

export const UserAlreadyExistsError = createError('UserAlreadyExistsError', {
  message: 'User already exists',
});
