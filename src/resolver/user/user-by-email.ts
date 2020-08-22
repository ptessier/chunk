import { Context } from '~/context/create-context';
import { baseResolver } from '~/resolver/common/base-resolver';

const resolver = (obj, { email }, context: Context, info) => context.prisma.user.findOne({ where: { email } });

export const userByEmail = baseResolver.createResolver(resolver);
