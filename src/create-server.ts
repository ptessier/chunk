import { GraphQLServer } from 'graphql-yoga';
import { log } from './logger';
import pino from 'express-pino-logger';
import { Props } from 'graphql-yoga/dist/types';

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
