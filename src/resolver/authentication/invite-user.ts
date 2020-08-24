import { Context } from '~/context/create-context';
import { InvalidEmailError } from '~/error/invalid-email-error';
import { UserAlreadyExistsError } from '~/error/user-already-exists-error';
import { tokens } from '~/helper/tokens';
import { validator } from '~/helper/validator';
import { log } from '~/logger';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = async (parent, { email }, context: Context, info) => {
  if (!validator.isEmail(email)) {
    throw new InvalidEmailError();
  }

  const existingUser = await context.prisma.user.findOne({ where: { email } });

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  const inviteToken = tokens.generate();

  const user = await context.prisma.user.create({
    data: { email, password: '', inviteAccepted: false, inviteToken },
  });

  // TODO: send invite email
  log.info(`inviteToken: ${inviteToken}`);

  return user;
};

export const inviteUser = baseResolver.createResolver(resolver);
