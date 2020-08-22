import { createError } from 'apollo-errors';

export const InvalidInviteTokenError = createError('InvalidInviteTokenError', {
  message: 'Invite token is invalid',
});
