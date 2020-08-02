import jwt, { SignOptions } from 'jsonwebtoken';
import { Viewer } from '~/context/authorize';

const SCOPE_SEPARATOR = ' ';

export const JwtTokens = Object.freeze({
  sign(payload: Viewer, secret: string, options: SignOptions = { expiresIn: '1d' }) {
    return jwt.sign(payload, secret, options);
  },
  verify(token: string, secret: string): Viewer {
    return jwt.verify(token, secret) as Viewer;
  },
  joinScopes(scopes: string[]): string {
    if (scopes == null) {
      return '';
    }

    return scopes.join(SCOPE_SEPARATOR);
  },

  splitScope(scope: string): string[] {
    if (scope == null) {
      return [];
    }

    return scope.split(SCOPE_SEPARATOR).filter((value: string) => value.trim().length > 0);
  },

  contains(scopes: string[], searchedScope: string): boolean {
    return scopes.find((scope) => scope === searchedScope) != null;
  },
});
