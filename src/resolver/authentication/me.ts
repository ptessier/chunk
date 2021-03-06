import { Context } from '~/context/create-context';
import { isAuthenticatedResolver } from '~/resolver/common/is-authenticated-resolver';

const resolver = (parent, args, context: Context, info) =>
  context.prisma.user.findOne({ where: { id: context.viewer.userId } });

export const me = isAuthenticatedResolver.createResolver(resolver);
