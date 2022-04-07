import moment from 'moment';
import { BG_RED, BLACK, RESET } from './constant';

export const fatal = (message: string, instance: string) => {
  const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(
    BG_RED + BLACK + `[${datetime}]`,
    `[${instance}]`,
    ':',
    message,
    RESET,
  );
};
