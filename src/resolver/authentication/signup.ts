import { config } from '~/config';
import { Context } from '~/context/create-context';
import { JwtTokens } from '~/helper/jwt-tokens';
import { Passwords } from '~/helper/passwords';
import { uuid } from '~/helper/uuid';
import { baseResolver } from '~/resolver/common/base-resolver';

export const signup = baseResolver.createResolver(async (_, args, context: Context, __) => {
  const password = await Passwords.hash(args.password, 10);
  const emailConfirmToken = uuid();

  const user = await context.prisma.user.create({
    data: { email: args.email, emailConfirmToken, emailConfirmed: false, inviteAccepted: true, password },
  });

  // TODO: send confirm email

  return {
    token: JwtTokens.sign({ userId: user.id }, config.secret()),
    user,
  };
});
