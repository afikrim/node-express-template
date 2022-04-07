import moment from 'moment';
import { RED, RESET } from './constant';

export const error = (message: string, instance: string) => {
  const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(RED + `[${datetime}]`, `[${instance}]`, ':', message, RESET);
};
