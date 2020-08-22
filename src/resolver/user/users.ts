import { UserOrderByInput } from '@prisma/client';
import { Context } from '~/context/create-context';
import { baseResolver } from '~/resolver/common/base-resolver';

interface Args {
  skip?: number;
  take?: number;
  orderBy?: UserOrderByInput;
}

const resolver = async (obj, { skip, take, orderBy }: Args, context: Context, info) => {
  const results = context.prisma.user.findMany({
    skip,
    take,
    orderBy,
  });

  return results;
};

export const users = baseResolver.createResolver(resolver);
