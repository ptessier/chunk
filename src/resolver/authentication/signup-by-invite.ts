import { createError } from 'apollo-errors';
import { config } from '~/config';
import { Context } from '~/context/create-context';
import { JwtTokens } from '~/helper/jwt-tokens';
import { Passwords } from '~/helper/passwords';
import { baseResolver } from '~/resolver/common/base-resolver';

const UserNotFoundError = createError('UserNotFoundError', {
  message: 'User not found',
});

const InvalidInviteTokenError = createError('InvalidInviteTokenError', {
  message: 'Invite token is invalid',
});

export const signupByInvite = baseResolver.createResolver(async (_, args, context: Context, __) => {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  if (user.inviteToken !== args.inviteToken || user.inviteAccepted) {
    throw new InvalidInviteTokenError();
  }

  const password = await Passwords.hash(args.password, config.secret());

  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: {
      inviteToken: null,
      inviteAccepted: true,
      password,
    },
  });

  return {
    token: JwtTokens.sign({ userId: user.id }, config.secret()),
    user: updatedUser,
  };
});
