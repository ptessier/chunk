import jwt from 'jsonwebtoken';
import { config } from '~/config';
import { Viewer } from '~/model/viewer';

const SCOPE_SEPARATOR = ' ';

const SIGN_OPTIONS = { expiresIn: '1d' };

const JWT_SECRET = config.secret();

export const JwtTokens = Object.freeze({
  sign(payload: Viewer) {
    return jwt.sign(payload, JWT_SECRET, SIGN_OPTIONS);
  },
  verify(token: string): Viewer {
    return jwt.verify(token, JWT_SECRET) as Viewer;
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
