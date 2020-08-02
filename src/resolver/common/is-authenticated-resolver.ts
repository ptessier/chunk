import { AuthenticationRequiredError } from '~/error';
import { baseResolver } from '~/resolver/common/base-resolver';

export const isAuthenticatedResolver = baseResolver.createResolver(
  // Check if there's a viewer
  (_, __, { viewer }, ___) => {
    if (!viewer) {
      throw new AuthenticationRequiredError();
    }
  },
);
