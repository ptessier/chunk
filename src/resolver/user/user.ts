import { Context } from '~/context/create-context';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = (obj, { id }, context: Context, info) => context.prisma.user.findOne({ where: { id } });

export const user = baseResolver.createResolver(resolver);
