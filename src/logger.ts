import pino from 'pino';
import { isProduction } from '~/helper/environment';

export const log = pino({ level: process.env.LOG_LEVEL || inferDefaultLogLevel() });

function inferDefaultLogLevel() {
  if (isProduction) {
    return 'info';
  }

  return 'debug';
}
