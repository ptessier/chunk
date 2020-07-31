export interface ErrorConfig {
  message: string;
  time_thrown?: string;
  data?: object;
  internalData?: object;
  options?: {
    showPath?: boolean;
    showLocations?: boolean;
  };
}

export interface ErrorInfo {
  message: string;
  name: string;
  time_thrown: string;
  data?: object;
  path?: string;
  locations?: any;
}

export abstract class ExtendableError extends Error {
  name: string;

  private _error: Error;
  private _stack: string;

  constructor(public message = '') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    delete (this as Error).stack;
    this.name = new.target.name;
    this._error = new Error();
  }

  get stack(): string {
    if (this._stack) {
      return this._stack;
    }

    let prototype = Object.getPrototypeOf(this);
    let depth = 1;

    loop: while (prototype) {
      switch (prototype) {
        case ExtendableError.prototype:
          break loop;
        case Object.prototype:
          depth = 1;
          break loop;
        default:
          depth++;
          break;
      }

      prototype = Object.getPrototypeOf(prototype);
    }

    const stackLines = (this._error.stack || '').match(/.+/g) || [];
    let nameLine = this.name;

    if (this.message) {
      nameLine += `: ${this.message}`;
    }

    stackLines.splice(0, depth + 1, nameLine);

    return (this._stack = stackLines.join('\n'));
  }
}

export class BaseError extends ExtendableError {
  name: string;
  message: string;
  // tslint:disable-next-line: variable-name
  time_thrown: string;
  data: object;
  internalData: object;
  path: any;
  locations: any;
  _showLocations: boolean = false;
  _showPath: boolean = false;

  // NOTE: The object passed to the Constructor is actually `ctorData`.
  //       We are binding the constructor to the name and config object
  //       for the first two parameters inside of `createError`
  constructor(name: string, config: ErrorConfig, ctorConfig: ErrorConfig) {
    super((ctorConfig && ctorConfig.message) || (config && config.message) || '');

    const t = (ctorConfig && ctorConfig.time_thrown) || (config && config.time_thrown) || new Date().toISOString();
    const m = (ctorConfig && ctorConfig.message) || (config && config.message) || '';
    const ctorData = (ctorConfig && ctorConfig.data) || {};
    const ctorInternalData = (ctorConfig && ctorConfig.internalData) || {};
    const configData = (config && config.data) || {};
    const configInternalData = (config && config.internalData) || {};
    const d = { ...this.data, ...configData, ...ctorData };
    const id = { ...this.internalData, ...configInternalData, ...ctorInternalData };
    const ctorOptions = (ctorConfig && ctorConfig.options) || {};
    const configOptions = (config && config.options) || {};
    const opts = { ...configOptions, ...ctorOptions };

    this.name = name;
    this.message = m;
    this.time_thrown = t;
    this.data = d;
    this.internalData = id;
    this._showLocations = !!opts.showLocations;
    this._showPath = !!opts.showPath;
  }

  serialize(): ErrorInfo {
    const { name, message, time_thrown, data, _showLocations, _showPath, path, locations } = this;

    const error: ErrorInfo = {
      message,
      name,
      time_thrown,
      data,
      path,
      locations,
    };

    if (_showLocations) {
      error.locations = locations;
    }

    if (_showPath) {
      error.path = path;
    }

    return error;
  }
}

export const isInstance = (error: any) => error instanceof BaseError;

export const createError = (name: string, config: ErrorConfig) => {
  return BaseError.bind(null, name, config);
};
