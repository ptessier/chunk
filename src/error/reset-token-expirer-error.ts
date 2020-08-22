import { createError } from 'apollo-errors';

export const ResetTokenExpiredError = createError('ResetTokenExpiredError', {
  message: 'Reset token has expired',
});
