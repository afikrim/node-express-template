import { Router } from 'express';
import { DEBUG, ERROR, FATAL, INFO, WARNING } from './constant';
import { debug } from './debug';
import { error } from './error';
import { fatal } from './fatal';
import { info } from './info';
import { warning } from './warning';

export const log = (message: string, instance: string, level = INFO) => {
  switch (level) {
    case INFO:
      info(message, instance);
      break;
    case DEBUG:
      debug(message, instance);
      break;
    case WARNING:
      warning(message, instance);
      break;
    case ERROR:
      error(message, instance);
      break;
    case FATAL:
      fatal(message, instance);
      break;
  }
};

export const routeMapping = (prefix: string, router: Router) => {
  log('Start mapping routes from group: ' + prefix, routeMapping.name);

  router.stack.forEach(({ route: { path, stack } }) => {
    log(
      `Registering ${stack[0].method.toUpperCase()} ${prefix + path}`,
      routeMapping.name,
    );
  });
};
