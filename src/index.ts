import { importSchema } from 'graphql-import';
import { createContext } from '~/context/create-context';
import { createServer } from '~/create-server';
import { log } from '~/logger';
import { resolvers } from '~/resolver';
import { config } from './config';

const server = createServer({
  context: createContext,
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
});

const options = config.graphql();

log.info('Starting server.', options);

server.start(options, () => {
  log.info(`Server is running on http://localhost:${options.port}`);

  if (options.playground) {
    log.info(`GraphQL playground is running on http://localhost:${options.port}${options.playground}`);
  }
});
