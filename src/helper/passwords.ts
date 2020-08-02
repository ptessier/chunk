import bcrypt from 'bcryptjs';

export const Passwords = Object.freeze({
  compare: bcrypt.compare,
  hash: bcrypt.hash,
});
