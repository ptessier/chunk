import { AuthPayload } from '~/resolver/authentication/auth-payload';
import { changePassword } from '~/resolver/authentication/change-password';
import { confirmEmail } from '~/resolver/authentication/confirm-email';
import { inviteUser } from '~/resolver/authentication/invite-user';
import { login } from '~/resolver/authentication/login';
import { me } from '~/resolver/authentication/me';
import { sendResetPassword } from '~/resolver/authentication/send-reset-password';
import { signup } from '~/resolver/authentication/signup';
import { signupByInvite } from '~/resolver/authentication/signup-by-invite';
import { version } from '~/resolver/common/version-resolver';
import { user } from '~/resolver/user/user';
import { userByEmail } from '~/resolver/user/user-by-email';
import { users } from '~/resolver/user/users';

export const resolvers = {
  AuthPayload,
  Mutation: {
    changePassword,
    confirmEmail,
    inviteUser,
    login,
    sendResetPassword,
    signup,
    signupByInvite,
  },
  Query: {
    me,
    user,
    userByEmail,
    users,
    version,
  },
};
