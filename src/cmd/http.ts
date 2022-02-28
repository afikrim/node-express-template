import { config } from 'dotenv';
import express, { Application, json, urlencoded } from 'express';
import { existsSync } from 'fs';
import { Server } from 'http';
import { newUserService } from '../internal/core/services/user/service';
import { newUserHttpHandler } from '../internal/handlers/http/user';
import { newUserRepository } from '../internal/repositories/user/repository';
import knex, { Knex } from 'knex';
import path from 'path';

const loadEnvVars = (): Error | null => {
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

const initKnex = (): [Knex | null, Error | null] => {
  const dialect = process.env.DB_DIALECT;
  const config: Knex.Config = {
    debug: process.env.ENV !== 'production',
    pool: {
      min: process.env.ENV !== 'production' ? 1 : 2,
      max: process.env.ENV !== 'production' ? 2 : 5,
    },
    connection: process.env.DB_CONNECTION_STRING
      ? process.env.DB_CONNECTION_STRING
      : {
          host: process.env.DB_HOSTNAME,
          port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        },
  };

  let knexConnection: Knex;
  switch (dialect) {
    case 'mariadb':
    case 'mysql':
      knexConnection = knex(
        Object.assign({}, config, {
          client: 'mysql2',
        }),
      );
      return [knexConnection, null];
    case 'postgres':
      knexConnection = knex(
        Object.assign({}, config, {
          client: 'pg',
        }),
      );
      return [knexConnection, null];
    default:
      return [null, new Error('Dialect not defined.')];
  }
};

const main = (args: { knex: Knex }): Server => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const app: Application = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());

  const userRepository = newUserRepository(args.knex);
  const userService = newUserService(userRepository);
  const userHttpHandler = newUserHttpHandler(userService);

  app.use(userHttpHandler.prefix, userHttpHandler.router);

  return app.listen(port);
};

const loadEnvError = loadEnvVars();
if (loadEnvError) {
  console.log('Server crashed: ' + loadEnvError.message);
  console.log('Stack trace:\n' + loadEnvError.stack);
  process.exit(1);
}
const [knexConnection, initKnexError] = initKnex();
if (initKnexError) {
  console.log('Server crashed: ' + initKnexError.message);
  console.log('Stack trace:\n' + initKnexError.stack);
  process.exit(1);
}
const server = main({ knex: knexConnection as Knex });

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
