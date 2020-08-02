import { config } from '~/config';
import { JwtTokens } from '~/helper/jwt-tokens';
import { Passwords } from '~/helper/passwords';
import { baseResolver } from '~/resolver/common/base-resolver';

export const signupResolver = async (_, args, context, __) => {
  const password = await Passwords.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { email: args.email, password },
  });

  return {
    token: JwtTokens.sign({ userId: user.id }, config.secret()),
    user,
  };
};

export const signup = baseResolver.createResolver(signupResolver);
