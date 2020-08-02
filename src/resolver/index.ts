import { AuthPayload, login, me, signup } from '~/resolver/authentication';
import { version } from '~/resolver/version-resolver';

export const resolvers = {
  AuthPayload,
  Mutation: {
    login,
    signup,
  },
  Query: {
    me,
    version,
  },
};
