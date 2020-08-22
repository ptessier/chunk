import { v4 } from 'uuid';

export const tokens = Object.freeze({
  generate() {
    return v4();
  },
});
