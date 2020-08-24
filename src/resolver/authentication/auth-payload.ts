import { Context } from '~/context/create-context';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = ({ user: { id } }, args, context: Context, info) => context.prisma.user.findOne({ where: { id } });

const user = baseResolver.createResolver(resolver);

export const AuthPayload = {
  user,
};
