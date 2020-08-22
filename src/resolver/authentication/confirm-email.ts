import { createError } from 'apollo-errors';
import { config } from '~/config';
import { Context } from '~/context/create-context';
import { JwtTokens } from '~/helper/jwt-tokens';
import { baseResolver } from '~/resolver/common/base-resolver';

const UserNotFoundError = createError('UserNotFoundError', {
  message: 'User not found',
});

const InvalidEmailConfirmToken = createError('InvalidEmailConfirmToken', {
  message: 'Email confirmation token has expired',
});

export const confirmEmail = baseResolver.createResolver(async (_, args, context: Context, __) => {
  const user = await context.prisma.user.findOne({ where: { email: args.email } });

  if (!user) {
    throw new UserNotFoundError();
  }

  if (user.emailConfirmToken !== args.emailConfirmToken || user.emailConfirmed) {
    throw new InvalidEmailConfirmToken();
  }

  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: {
      emailConfirmToken: null,
      emailConfirmed: true,
    },
  });

  return {
    token: JwtTokens.sign({ userId: user.id }, config.secret()),
    user: updatedUser,
  };
});
