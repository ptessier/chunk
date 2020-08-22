import { createError } from 'apollo-errors';
import { Context } from '~/context/create-context';
import { Passwords } from '~/helper/passwords';
import { baseResolver } from '~/resolver/common/base-resolver';

const UserNotFoundError = createError('UserNotFoundError', {
  message: 'User not found',
});

const ResetTokenExpiredError = createError('ResetTokenExpiredError', {
  message: 'Reset token has expired',
});

export const changePassword = baseResolver.createResolver(async (_, args, context: Context, __) => {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (!user || !user.resetExpires || user.resetToken !== args.resetToken) {
    throw new UserNotFoundError();
  }

  if (new Date() > new Date(user.resetExpires)) {
    throw new ResetTokenExpiredError();
  }

  const password = await Passwords.hash(args.password, 10);

  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: { resetToken: null, resetExpires: undefined, password },
  });

  return updatedUser;
});
