export type ResponseDataType<T> = {
  data: T;
  message: string;
  statusCode: number;
  error: boolean;
};
