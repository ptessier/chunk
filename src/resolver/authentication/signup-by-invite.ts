import { Context } from '~/context/create-context';
import { InvalidInviteTokenError } from '~/error/invalid-invite-token-error';
import { UserNotFoundError } from '~/error/user-not-found-error';
import { JwtTokens } from '~/helper/jwt-tokens';
import { Passwords } from '~/helper/passwords';
import { log } from '~/logger';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = async (_, { email, password, inviteToken }, context: Context, __) => {
  const user = await context.prisma.user.findOne({ where: { email } });

  log.info(`searching user with ${email}`);

  if (!user) {
    throw new UserNotFoundError();
  }

  log.info(`validating token ${inviteToken} expecting ${inviteToken}`);

  if (user.inviteToken !== inviteToken || user.inviteAccepted) {
    throw new InvalidInviteTokenError();
  }

  const hashedPassword = await Passwords.hash(password);

  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: { inviteToken: null, inviteAccepted: true, emailConfirmed: true, password: hashedPassword },
  });

  log.info(updatedUser);

  return {
    token: JwtTokens.sign({ userId: user.id }),
    user: updatedUser,
  };
};

export const signupByInvite = baseResolver.createResolver(resolver);
