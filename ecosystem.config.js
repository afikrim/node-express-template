// eslint-disable-next-line @typescript-eslint/no-var-requires
const package = require('./package.json');

module.exports = {
  apps: [
    {
      name: package.name,
      version: package.version,
      script: './dist/cmd/http.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
