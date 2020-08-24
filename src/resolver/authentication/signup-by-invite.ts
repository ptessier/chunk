import { Context } from '~/context/create-context';
import { InvalidInviteTokenError } from '~/error/invalid-invite-token-error';
import { UserNotFoundError } from '~/error/user-not-found-error';
import { JwtTokens } from '~/helper/jwt-tokens';
import { Passwords } from '~/helper/passwords';
import { baseResolver } from '~/resolver/common/base-resolver';
import { NEW_USER } from '~/subscription/triggers';

const resolver = async (parent, { email, password, inviteToken }, context: Context, info) => {
  const user = await context.prisma.user.findOne({ where: { email } });

  if (!user) {
    throw new UserNotFoundError();
  }

  if (user.inviteToken !== inviteToken || user.inviteAccepted) {
    throw new InvalidInviteTokenError();
  }

  const hashedPassword = await Passwords.hash(password);

  const updatedUser = await context.prisma.user.update({
    where: { id: user.id },
    data: { inviteToken: null, inviteAccepted: true, emailConfirmed: true, password: hashedPassword },
  });

  context.pubsub.publish(NEW_USER, user);

  return {
    token: JwtTokens.sign({ userId: user.id }),
    user: updatedUser,
  };
};

export const signupByInvite = baseResolver.createResolver(resolver);
