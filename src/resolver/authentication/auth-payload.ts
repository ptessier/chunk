import { Context } from '~/context/create-context';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = async ({ user: { id } }, _, context: Context, __) =>
  await context.prisma.user.findOne({ where: { id } });

const user = baseResolver.createResolver(resolver);

export const AuthPayload = {
  user,
};
