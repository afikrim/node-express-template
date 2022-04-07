import moment from 'moment';
import { RESET, YELLOW } from './constant';

export const warning = (message: string, instance: string) => {
  const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(YELLOW + `[${datetime}]`, `[${instance}]`, ':', message, RESET);
};
