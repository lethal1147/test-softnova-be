import { ErrorObject, StatusCodeEnum } from "types/error";

const createError = (
  message: string,
  statusCode: StatusCodeEnum,
): ErrorObject => {
  const err = new Error(message) as ErrorObject;
  err.statusCode = statusCode;
  throw err;
};

export default createError;
