import { ErrorInfo, isInstance } from '~/error/base-error';

export const formatError = (error: any, returnNull = false): ErrorInfo => {
  const originalError = error ? error.originalError || error : null;

  if (!originalError) return returnNull ? null : error;

  const { name } = originalError;

  if (!name || !isInstance(originalError)) return returnNull ? null : error;

  const { time_thrown, message, data, _showLocations, _showPath } = originalError;
  const { locations, path } = error;

  if (_showLocations) {
    originalError.locations = locations;
  }

  if (_showPath) {
    originalError.path = path;
  }

  return originalError.serialize();
};
