import { Request } from 'express';
import { JwtTokens } from '~/helper/jwt-tokens';
import { log } from '~/logger';

export interface Viewer {
  userId?: number;
}

export const authorize = (request: Request, secret: string): Viewer => {
  const authorization = request.get('Authorization');

  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    try {
      return JwtTokens.verify(token, secret);
    } catch (error) {
      log.error('Failed to parse token', error);
    }
  }

  return undefined;
};
