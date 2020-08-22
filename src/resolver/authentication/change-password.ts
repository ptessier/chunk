import { Context } from '~/context/create-context';
import { ResetTokenExpiredError } from '~/error/reset-token-expirer-error';
import { UserNotFoundError } from '~/error/user-not-found-error';
import { Passwords } from '~/helper/passwords';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = async (_, { email, password, resetToken }, context: Context, __) => {
  const user = await context.prisma.user.findOne({ where: { email } });

  if (!user || !user.resetExpires || user.resetToken !== resetToken) {
    throw new UserNotFoundError();
  }

  if (new Date() > new Date(user.resetExpires)) {
    throw new ResetTokenExpiredError();
  }

  const hashedPassword = await Passwords.hash(password);

  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: { resetToken: undefined, resetExpires: undefined, password: hashedPassword },
  });

  return updatedUser;
};

export const changePassword = baseResolver.createResolver(resolver);
