import { Context } from '~/context/create-context';
import { isAuthenticatedResolver } from '~/resolver/common/is-authenticated-resolver';

const meResolver = (__, ___, context: Context) => {
  const userId = context.viewer.userId;

  return context.prisma.user.findOne({ where: { id: userId } });
};

export const me = isAuthenticatedResolver.createResolver(meResolver);
