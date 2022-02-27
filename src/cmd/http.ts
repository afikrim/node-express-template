import express, { Application } from 'express';
import { config } from 'dotenv';
import path from 'path';
import { existsSync } from 'fs';
import { Server } from 'http';

const loadEnvVars = (): any => {
  const defaultEnvPath = path.resolve(process.cwd(), '.env');
  const localEnvPath = path.resolve(process.cwd(), '.env.local');

  if (!existsSync(defaultEnvPath))
    return new Error('default env is not defined.');

  console.log('Loading env variables from default .env path');
  config({ path: defaultEnvPath });
  if (existsSync(localEnvPath)) {
    console.log('Loading env variables from local .env path');
    config({ path: localEnvPath });
  }

  return null;
};

const main = (): Server => {
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const app: Application = express();

  return app.listen(PORT);
};

loadEnvVars();
const server = main();

server.on('listening', () => {
  console.log('Server started at: :' + process.env.PORT || 3000);
});
server.on('error', (err) => {
  console.log('Server crashed: ' + err.message);
  console.log('Stack trace:\n' + err.stack);
});
server.on('close', () => {
  console.log('Closing server...');
});
