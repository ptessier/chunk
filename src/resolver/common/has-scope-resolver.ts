import { NotAuthorizedError } from '~/error/not-authorized-error';
import { JwtTokens } from '~/helper/jwt-tokens';
import { isAuthenticatedResolver } from '~/resolver/common/is-authenticated-resolver';

export const hasScopeResolver = (expectedScope: string) =>
  isAuthenticatedResolver.createResolver((_, __, { viewer }, ___) => {
    const scopes = JwtTokens.splitScope(viewer.scopes);

    JwtTokens.contains(scopes, expectedScope);

    if (!JwtTokens.contains(scopes, expectedScope)) {
      throw new NotAuthorizedError();
    }
  });
