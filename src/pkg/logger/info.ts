import moment from 'moment';
import { GREEN, RESET } from './constant';

export const info = (message: string, instance: string) => {
  const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(GREEN + `[${datetime}]`, `[${instance}]`, ':', message, RESET);
};
