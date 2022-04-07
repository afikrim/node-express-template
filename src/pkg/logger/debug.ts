import moment from 'moment';
import { CYAN, RESET } from './constant';

export const debug = (message: string, instance: string) => {
  const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(CYAN + `[${datetime}]`, `[${instance}]`, ':', message, RESET);
};
