import { Context } from '~/context/create-context';
import { InvalidEmailError } from '~/error/invalid-email-error';
import { JwtTokens } from '~/helper/jwt-tokens';
import { Passwords } from '~/helper/passwords';
import { tokens } from '~/helper/tokens';
import { validator } from '~/helper/validator';
import { baseResolver } from '~/resolver/common/base-resolver';
import { NEW_USER } from '~/subscription/triggers';

const resolver = async (parent, { email, password }, context: Context, info) => {
  if (!validator.isEmail(email)) {
    throw new InvalidEmailError();
  }

  const hashedPassword = await Passwords.hash(password);

  const emailConfirmToken = tokens.generate();

  const user = await context.prisma.user.create({
    data: { email, emailConfirmToken, emailConfirmed: false, inviteAccepted: true, password: hashedPassword },
  });

  // TODO: send confirm email

  context.pubsub.publish(NEW_USER, user);

  return {
    token: JwtTokens.sign({ userId: user.id }),
    user,
  };
};

export const signup = baseResolver.createResolver(resolver);
