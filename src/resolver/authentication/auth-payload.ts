import { Context } from '~/context/create-context';
import { baseResolver } from '~/resolver/common/base-resolver';

const userResolver = ({ user: { id } }, _, context: Context, __) => context.prisma.user.findOne({ where: { id } });

const user = baseResolver.createResolver(userResolver);

export const AuthPayload = {
  user,
};
