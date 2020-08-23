import { Context } from '~/context/create-context';

export const newUser = {
  subscribe: (_obj, _args, context: Context, _info) => context.pubsub.asyncIterator(['NEW_USER']),
  resolve: (payload) => payload,
};
