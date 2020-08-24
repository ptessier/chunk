import { Context } from '~/context/create-context';
import { InvalidPasswordError } from '~/error/invalid-password-error';
import { UserNotFoundError } from '~/error/user-not-found-error';
import { JwtTokens } from '~/helper/jwt-tokens';
import { Passwords } from '~/helper/passwords';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = async (parent, { email, password }, context: Context, info) => {
  const user = await context.prisma.user.findOne({ where: { email } });

  if (!user) {
    throw new UserNotFoundError({ message: `No user found for email: ${email}` });
  }

  const valid = await Passwords.compare(password, user.password);

  if (!valid) {
    throw new InvalidPasswordError();
  }

  return {
    token: JwtTokens.sign({ userId: user.id }),
    user,
  };
};

export const login = baseResolver.createResolver(resolver);
