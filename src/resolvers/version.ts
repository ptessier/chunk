export const version = () => {
  const metadata = require(`${process.cwd()}/package.json`);

  return sanitizeVersion(metadata.version);
};

export const sanitizeVersion = (packageVersion: string) => packageVersion.replace(/-[a-z-]+\.[0-9]+/, '');
