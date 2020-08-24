import { Request } from 'express';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { ExecutionParams } from 'subscriptions-transport-ws';
import { JwtTokens } from '~/helper/jwt-tokens';
import { log } from '~/logger';
import { Viewer } from '~/model/viewer';

export const authorize = (context: ContextParameters): Viewer => {
  const { request, connection } = context;

  if (request) return authorizeRequest(request);

  if (connection) return authorizeContext(connection);

  return undefined;
};

const authorizeRequest = (request: Request): Viewer => {
  const authorization = request.get('Authorization');

  return getViewer(authorization);
};

const authorizeContext = (connection: ExecutionParams): Viewer => {
  const authorization = connection.context.Authorization;

  return getViewer(authorization);
};

const getViewer = (authorization: string): Viewer => {
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
