import bcrypt from 'bcryptjs';

const PASSWORD_SALT = 10;

export const Passwords = Object.freeze({
  compare: (s: string, hash: string) => bcrypt.compare(s, hash),
  hash: (s: string) => bcrypt.hash(s, PASSWORD_SALT),
});
