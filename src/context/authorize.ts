import { Request } from 'express';
import { JwtTokens } from '~/helper/jwt-tokens';
import { log } from '~/logger';
import { Viewer } from '~/model/viewer';

export const authorize = (request: Request): Viewer => {
  const authorization = request.get('Authorization');

  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    try {
      return JwtTokens.verify(token);
    } catch (error) {
      log.error('Failed to parse token', error);
    }
  }

  return undefined;
};
