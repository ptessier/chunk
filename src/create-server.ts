import pino from 'express-pino-logger';
import { GraphQLServer } from 'graphql-yoga';
import { Props } from 'graphql-yoga/dist/types';
import { log } from '~/logger';

export interface Options extends Props {
  logging?: boolean;
}

export function createServer(options: Options): GraphQLServer {
  const server: GraphQLServer = new GraphQLServer(options);

  if (options.logging) {
    server.use(pino({ logger: log }));
  }

  return server;
}
