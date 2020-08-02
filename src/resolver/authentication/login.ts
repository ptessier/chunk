import { config } from '~/config';
import { createError } from '~/error/base-error';
import { JwtTokens } from '~/helper/jwt-tokens';
import { Passwords } from '~/helper/passwords';
import { baseResolver } from '~/resolver/common/base-resolver';

const InvalidPasswordError = createError('InvalidPasswordError', {
  message: 'Invalid password',
});

const UserNotFoundError = createError('UserNotFoundError', {
  message: 'No user found',
});

export const loginResolver = async (_, { email, password }, context, __) => {
  const user = await context.prisma.user.findOne({ where: { email } });

  if (!user) {
    throw new UserNotFoundError({ message: `No user found for email: ${email}` });
  }

  const valid = await Passwords.compare(password, user.password);
  if (!valid) {
    throw new InvalidPasswordError();
  }

  return {
    token: JwtTokens.sign({ userId: user.id }, config.secret()),
    user,
  };
};

export const login = baseResolver.createResolver(loginResolver);
