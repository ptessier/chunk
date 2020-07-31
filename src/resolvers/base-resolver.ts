import { UnknownError } from '../errors';
import { isInstance } from '../errors/base-error';
import { isDevelopment } from '../helper/environment';
import { createResolver } from './create-resolver';

export const baseResolver = createResolver(
  // incoming requests will pass through this resolver like a no-op
  null,

  // Only mask outgoing errors that aren't already base-errors
  (_, __, ___, error) => {
    return isInstance(error) || isDevelopment ? error : new UnknownError();
  },
);
