export type ResponseModel = {
  status: 'success' | 'fail';
  message: string;
  data?: { [key: string]: any };
  meta?: { [key: string]: any };
};
