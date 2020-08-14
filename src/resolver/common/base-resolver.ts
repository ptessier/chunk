import { isInstance } from 'apollo-errors';
import { createResolver } from 'apollo-resolvers';
import { UnknownError } from '~/error/unknown-error';
import { isDevelopment } from '~/helper/environment';

export const baseResolver = createResolver(
  // incoming requests will pass through this resolver like a no-op
  null,

  // Only mask outgoing errors that aren't already base-errors
  (_, __, ___, error) => {
    return isInstance(error) || isDevelopment ? error : new UnknownError();
  },
);
