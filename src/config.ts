import { Options } from 'graphql-yoga';
import { env, Provider } from 'nconf';

export class ConfigProvider {
  private nconf: Provider;

  constructor() {
    this.nconf = env('_').file({ file: `${process.cwd()}/config.json` });
  }

  graphql(): Options {
    return this.get('graphql');
  }

  private get(keyPath: string): any {
    return this.nconf.get(keyPath);
  }
}

export const config = new ConfigProvider();
