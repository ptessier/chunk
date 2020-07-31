import { importSchema } from 'graphql-import';
import { createServer } from '~/create-server';
import { log } from '~/logger';
import { resolvers } from '~/resolver';

const options = {
  port: 5000,
  playground: '/playground',
  tracing: true,
};

const server = createServer({
  logging: true,
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
});

log.info('Starting server.');

server.start(options, () => {
  log.info(`Server is running on http://localhost:${options.port}`);

  if (options.playground) {
    log.info(`GraphQL playground is running on http://localhost:${options.port}${options.playground}`);
  }
});
