export type RequestParamsModel<T = Record<string, any>> = T;

export type RequestQueryModel<T> = {
  offset?: string;
  limit?: string;
  sortby?: keyof T;
  orderby?: 'asc' | 'desc';
};
