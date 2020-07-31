import { createError } from './base-error';

export const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
  message: 'You must be logged in to do this',
});

export const NotAuthorizedError = createError('NotAuthorizedError', {
  message: 'You are not authorized.',
});

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error occurred.',
});
