import { Context } from '~/context/create-context';
import { InvalidEmailError } from '~/error/invalid-email-error';
import { UserNotFoundError } from '~/error/user-not-found-error';
import { tokens } from '~/helper/tokens';
import { validator } from '~/helper/validator';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = async (parent, { email }, context: Context, info) => {
  if (!validator.isEmail(email)) {
    throw new InvalidEmailError();
  }

  const user = await context.prisma.user.findOne({ where: { email } });

  if (!user) {
    throw new UserNotFoundError();
  }

  // Expires in 2h
  const resetExpires = new Date(new Date().getTime() + 1000 * 60 * 60 * 2).toISOString();
  const resetToken = tokens.generate();

  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: { resetExpires, resetToken },
  });

  // TODO: send reset password email

  return updatedUser;
};

export const sendResetPassword = baseResolver.createResolver(resolver);
