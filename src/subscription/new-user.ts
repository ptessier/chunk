import { Context } from '~/context/create-context';
import { isAuthenticatedResolver } from '~/resolver/common/is-authenticated-resolver';
import { NEW_USER } from '~/subscription/triggers';

export const newUser = {
  subscribe: isAuthenticatedResolver.createResolver((parent, args, context: Context, info) => {
    return context.pubsub.asyncIterator([NEW_USER]);
  }),
  resolve: (payload, context) => {
    // note: you could authorize the payload instead

    return payload;
  },
};
