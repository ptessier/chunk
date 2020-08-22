import { createError } from 'apollo-errors';
import { Context } from '~/context/create-context';
import { uuid } from '~/helper/uuid';
import { baseResolver } from '~/resolver/common/base-resolver';

const UserAlreadyExistsError = createError('UserAlreadyExistsError', {
  message: 'User already exists',
});

export const inviteUser = baseResolver.createResolver(async (_, args, context: Context, __) => {
  const inviteToken = uuid();

  const existingUser = await context.prisma.user.findOne({ where: { email: args.email } });

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  const user = await context.prisma.user.create({
    data: {
      email: args.email,
      password: '',
      inviteAccepted: false,
      inviteToken,
    },
  });

  // TODO: send invite email

  return user;
});
