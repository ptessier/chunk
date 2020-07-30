import { GraphQLServer } from 'graphql-yoga'
import { log } from './logger';

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

const options = {
    port: 5000,
    playground: '/playground'
};

const server = new GraphQLServer({ typeDefs, resolvers })

log.info('Starting server.');

server.start(options, () => {
  log.info(`Server is running on http://localhost:${options.port}`);

  if(options.playground) {
    log.info(`GraphQL playground is running on http://localhost:${options.port}${options.playground}`);
  }
});