import { createError } from 'apollo-errors';
import { Context } from '~/context/create-context';
import { uuid } from '~/helper/uuid';
import { baseResolver } from '~/resolver/common/base-resolver';

const UserNotFoundError = createError('UserNotFoundError', {
  message: 'User not found',
});

export const sendResetPassword = baseResolver.createResolver(async (_, args, context: Context, __) => {
  const user = await context.prisma.user.findOne({ where: { email: args.email } });

  if (!user) {
    throw new UserNotFoundError();
  }

  // Expires in two hours
  const resetExpires = new Date(new Date().getTime() + 7200000).toISOString();
  const resetToken = uuid();

  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: {
      resetExpires,
      resetToken,
    },
  });

  // TODO: send reste password email

  return updatedUser;
});
